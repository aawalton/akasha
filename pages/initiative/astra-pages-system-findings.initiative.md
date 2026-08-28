---
id: 01a04652-d203-7000-a8d2-49624ee7cc85
page-type-slug: initiative
slug: astra-pages-system-findings
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- The audit over the finding corpus passes, so the count of open findings can be read rather than argued.
- No finding in the pages system tree is unfalsifiable.
- Every finding whose defect is gone has been taken away.
- No finding-shaped claim lives on an initiative's notes instead of in a finding.
- No finding is open against the pages system domain or any domain beneath it.

# Notes

Opened 2026-08-28 to hold the third intent of `astra-pages-system`. The last intent here is that intent; the five above it are what has to be true before it can even be measured.

**The count can be read, and it is 137.** Measured 2026-08-28 on `main` at a clean tree: 3,110 findings under `pages/finding/`, of which 137 name `domain/pages-system` or one of the 374 domains beneath it. That is the quantity the last intent names, and this is the first time it has been taken. `findings-sorted` is still red — 2,379 sorted under 327 domain folders, 731 not sitting under the domain they name, no truncation in the list — but red now means misfiled rather than unreadable: every one of the 3,110 names a domain that exists, none carries a bare number, none is missing its page-type prefix, none is missing a slug, and `domain/946` appears nowhere. The earlier reading here, "29 sorted and fails the other 3,236", was true when it was taken and is not what a run reports now.

**Count findings by what they say, not by where they sit.** The same set counted by folder gives 108 and counted by each finding's own `domain-slug` gives 137. The 29 between are findings correctly addressed to this tree and filed somewhere else, which is precisely what `findings-sorted` exists to report — so the folder count reads as an answer while being a lower bound, and nothing about it says so. A first pass at this walked only `pages/` and reported 165 findings naming a domain nothing defines; that was an artifact, because personas are defined under `alan/persona/` rather than under `pages/`. Widening the walk to the whole repository took the artifact to 0 and left 137 unmoved. That is the control worth keeping: a correction that changes the wrong number and not the right one is evidence the right one was not resting on the mistake.

**The set, surveyed 2026-08-28 at `1c8e5677b`: 206 open in the tree.** 85 live, 109 whose defect is gone, 1 wrong, 11 unverified. Taking out the 29 that reach the tree only through `repo/akasha-repo` gives 177.

**The 109 are mostly not repairs.** The Postgres-backed pages layer was deleted, so at least 31 closed because their substrate went rather than because anything was corrected. Four of those — `cross-owner-relation-writes-unguarded`, `unattributed-write-clears-user-content`, `owner-guard-misses-unset-writes`, `raw-sql-upsert-bypasses-owner-guard` — are about owner guards on a write path, and a write path returns as the pages system service. What they knew belongs in that service's design before the findings go.

**The filed corpus is roughly 60% of the real set.** 25 findings are plainly pages-system and were repointed to `domain/global` when their own domain page was deleted. 64 outside the tree cite pages-system code. Around 30 finding-shaped claims live on the four initiatives' own notes and are filed nowhere — `relations.json`, `pruneEmpty`, `registryOf`, `kindsIn`, `folder-matches-a-shape` and `page-name-unique` appear in zero findings anywhere. 82 unmet Intent lines across 29 pages in the tree are filed defects that are not findings.

**Age cannot be read from this repository.** Every finding entered akasha in one bulk move and the history starts 2026-08-25. 188 of 206 carry a UUIDv5, derived from the slug with no clock. Only 10 carry a timestamp.

**Filing outpaces closing while the corpus is being made honest, and that is not failure.** A finding written down is a defect that was already there. The number to watch is live findings whose defect nobody has looked at, not the total.
