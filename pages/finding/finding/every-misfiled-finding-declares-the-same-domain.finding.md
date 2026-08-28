---
id: c482d6c6-cdaa-541e-8b47-0452a350a1cf
page-type-slug: finding
title: "Every misfiled finding declares the same domain"
slug: every-misfiled-finding-declares-the-same-domain
domain-slug: page-type/finding
---

# Claim

The 731 findings `findings-sorted` refuses are one population rather than a scatter: every one of them declares `domain-slug: domain/global`. The audit reports each as `finding-misfiled` and none as `finding-unfoldered` or `finding-too-deep`. So the misfiling is a single act repeated, not 731 independent mistakes, and one decision about where those findings belong would clear the whole failure.

# Evidence

Measured 2026-08-28 at `48a6a7171d`, running `bun run tools/run-checks.ts findings-sorted` in 0.35s.

The verdict line: fail, over 3120 findings under `pages/finding/`, 2389 sorted under 325 domain folders.

- 731 failures, all of kind `finding-misfiled`. Zero `finding-unfoldered`, zero `finding-too-deep`.
- 731 failure lines printed, one per failure, so nothing was truncated. 3120 minus 2389 minus 731 is 0, so every finding is accounted for.
- All 731 declare `domain-slug: domain/global`.
- 743 findings in the corpus declare `domain/global` in total; the 12 that pass are the ones standing under `pages/finding/global/`.

Earlier readings of the same audit, for comparison: 2,379 sorted under 327 domain folders at `d8b608167`, with the same 731 failures; and "29 sorted and fails the other 3,236" at `1c8e5677b`.

Four sub-claims made about this corpus hold: none carries a bare number, none is missing its page-type prefix, none is missing a slug, and `domain/946` appears nowhere in the repository outside the line asserting it.

One does not, and the count excluded the page stating it. Of the 326 values at `48a6a7171d`, one resolved to nothing: `domain/seat-presence`. This page did not exist then; landing it made a 327th, `domain/finding` — a page type, not a domain. Both are repaired, at `0fd4221018` and `4c022eab32`. Swept 2026-08-28 over all four types declaring the key: 334 distinct values, none unresolvable — an address resolves against any page type in the `domain` chain, not `*.domain.md` alone. `findings-sorted` passes them all, never checking existence, per `dead-domain-folder-passes`.

Which domain they should carry instead, measured 2026-08-28: for 715 of the 731 none exists. The folder names a retired vocabulary.

```
96 folders (pages/finding/global/ excluded)
 3 match a page slug: food, the-tower, dragons-and-dungeons -- 16 findings
93 match no page of any type                               -- 715 findings
441 of the 715 stand in six: code-check 141, code-harness 107, infra 70,
  instructions-harness 68, tests 36, readouts 19
```
