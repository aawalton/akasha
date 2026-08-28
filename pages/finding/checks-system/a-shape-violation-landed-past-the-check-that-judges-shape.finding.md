---
id: c438d635-cf02-539f-9048-2c6398c97d77
page-type-slug: finding
title: "A shape violation landed past the check that judges shape"
domain-slug: domain/checks-system
---

# Claim

`page-holds-to-its-type` judges whether a page holds to the shape its page type states, and it refuses no change. `checks-system/checks.ts:93-95` makes `refusesChange` `ON_PATCH || ON_WORKTREE`, and the check states both false at `page-holds-to-its-type.check.md:7-8`. On 2026-08-28 a page went through `ops write` over its shape bounds and landed; the gate reported nine checks and none refused. An audit afterwards named three violations in it. Nothing told the author. He found it by looking.

# Evidence

The page was `pages/finding/pages-system/a-split-sidecars-key-is-read-as-its-part-number.finding.md`, written by this seat and landed at commit `575187de`. That page no longer stands in the tree: the defect it named was fixed at `79d791236` and `7bced54af`, and it was deleted as already fixed, so it is read from git rather than from disk. The gate's whole answer was `gate: 9 akasha check(s) over 1 changed file(s), none refused`.

`ops checks audit page-holds-to-its-type` then named three failures against that same file: `# Claim` at line 8 measured 1342 against a bound of 500, the claim paragraph at line 17 measured 504 against 500, and `# Evidence` at line 21 measured 2400 against 2000. The bounds are `lg` and `2xl` on the claim and evidence slots of `pages/page-body-shape/finding.page-body-shape.md`. It was brought inside them at `8ef1bca5`.

Those three numbers are the check's own measurement. A character count this seat took by splitting the same file on its headings answered 1457 and 2480, and on a later draft answered 533 where the check said 521 — the hand count split on a heading name quoted inside the prose. A body is measured by putting it to the check, not by counting it.

What makes this worth recording is not the configuration but the consequence. The file was in the patch, its page type was known, the shape was declared, and the check that reads exactly those three things was registered and working — it ran an hour later on the same file and answered correctly. It simply was not asked at the moment it would have mattered. A violation of the kind a check exists to stop passed the gate that runs that check, and the only reason it did not stand is that its author happened to run an audit for an unrelated reason.

Not derived here: another seat reports six of the fifteen checks refuse nothing on the same disjunction. That count is theirs and this reading does not re-establish it. What is established here is that `page-holds-to-its-type` is one of them, and what one of them costs when it is off.
