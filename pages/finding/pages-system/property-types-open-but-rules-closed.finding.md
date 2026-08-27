---
id: 55719ad8-690b-58f1-af95-cf2898cb4c3c
slug: property-types-open-but-rules-closed
page-type-slug: finding
title: "Property types open but rules closed"
domain-slug: domain/pages-system
---

# Claim

The page property vocabulary is half-open: `page-property-types/*.md` is a directory anyone can add a file to, but the rules behind those names are hardcoded in `tools/lib/page-frontmatter.ts`. A property typed with a name carrying no rule is reported as `not judged` on the gate's PASS line, so a key nobody is checking is indistinguishable from one that passed.

# Evidence

Measured on 2026-08-14. Three type names stand in the directory today with no rule behind them — `block-bounds`, `slot-bounds` and `template` — and every write of a page type carrying `blocks:` or `slots:` prints the condition on its own pass line:

```
[page-holds-properties] pass  5 key(s) against the 17 propert(ies) `page-type` and what it extends declare;
    not judged — `blocks`: `block-bounds` is a type this states no rule for,
                 `choices`: `choice-bounds` is a type this states no rule for,
                 `slots`: `slot-bounds` is a type this states no rule for
```

That is observed output from a real write, not a reconstruction. The verdict is `pass`.

What makes this worth recording beyond the three names already known is the blast radius when `domain` moves. Its `reviewed-at` key is required on all 412 documents at `domains/*.md`, is typed `date` by the typed schema, and is what `tools/stale-reviews.ts` measures against. No `date` type exists in the property vocabulary. Landing `page-property-types/date.md` and typing the key against it takes one commit, refuses nothing, and reads as a completed move — after which `reviewed-at` is unchecked on every domain document in the repository, and the pass line is the only thing that says so.

The nearest existing type, `timestamp`, refuses all 412: every value is a bare `YYYY-MM-DD` and the rule demands an ISO instant. So the two available outcomes today are refuse-everything or check-nothing, and only one of them is quiet.

The same half-open shape applies to every type a later move needs: list, enum, glob.
