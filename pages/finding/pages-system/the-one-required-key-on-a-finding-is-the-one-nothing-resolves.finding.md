---
id: 89864f0f-8a6b-585b-8109-598de9c7f526
page-type-slug: finding
slug: the-one-required-key-on-a-finding-is-the-one-nothing-resolves
title: "The one required key on a finding is the one nothing resolves"
domain-slug: domain/pages-system
---

# Claim

`finding-domain-slug` is `required: true` and typed `relation-address`, but `relation-resolves` skips every page of a mortal page type, and `finding`, `seat` and `initiative` are all mortal. Of the 3,256 pages carrying `domain-slug`, 3,194 are never resolved and 62 are. Nothing refuses a finding whose `domain-slug` names no page. That is how a census of those values reported one unresolvable while its own key was a second, with every check green.

# Evidence

Measured 2026-08-28 at `cbb8fbfa66`.

`checks-system/check/relation-resolves/relation-resolves.check.code.attachment.ts:224` reads `if (mortal.pageAt(relPath)) continue`, dropping the carrying page before its wants are gathered. `pages/page-type/finding.page-type.md:11`, `pages/page-type/seat.page-type.md:11` and `pages/page-type/initiative.page-type.md:16` each state `mortal: true`; `all-about-alan-finding` does not.

The four page types declaring `domain-slug`: finding 3,171, initiative 15, seat 8 — all skipped — and all-about-alan-finding 62, checked.

Two `ops edit --dry-run` calls, the same substitution to `domain-slug: domain/no-such-slug-at-all`, differing in the file alone:

```
a finding                 -> 11 akasha check(s), none refused
an all-about-alan-finding -> relation-resolves: refused
```

The second reads: `domain-slug` names `domain/no-such-slug-at-all` — no page under `domain` carries that page type and slug. So the resolution works and the population excludes the findings. `ops checks audit relation-resolves` reports 0 failures over the whole tree for the same reason.

THIS IS BY DESIGN AND A LINE SAYS SO. `pages/page-property-definition/page-type-mortal.page-property-definition.md:21` — "A link with either end on a mortal page never refuses a write." What stands here is the consequence: a property declared `required: true` on a mortal page type is required in name only. `findings-sorted` does not close the gap, never checking existence, per `dead-domain-folder-passes`.

Not measured: whether any other `required: true` relation sits on a mortal page type.
