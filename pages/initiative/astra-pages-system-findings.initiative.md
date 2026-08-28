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
- Every finding filed against the pages system tree names a domain that exists.
- No finding in the pages system tree is unfalsifiable.
- Every finding whose defect is gone has been taken away.
- No finding-shaped claim lives on an initiative's notes instead of in a finding.
- No finding is open against the pages system domain or any domain beneath it.

# Notes

Opened 2026-08-28 to hold the third intent of `astra-pages-system`. The last intent here is that intent; the five above it are what has to be true before it can even be measured.

**The count cannot be read today.** `tools/audits/findings-sorted.ts:41` compares a prefixed `domain-slug` against a bare folder name as plain strings, so it reports 29 findings sorted and fails the other 3,236. While it is red nothing checks the corpus, and disorder has accumulated behind it: 190 findings name a domain that does not exist, 123 of those a bare number, `domain/946` eighty-one times. 31 carry no page-type prefix, 21 carry no slug, 23 sit a level too deep.

**The set, surveyed 2026-08-28 at `1c8e5677b`: 206 open in the tree.** 85 live, 109 whose defect is gone, 1 wrong, 11 unverified. Taking out the 29 that reach the tree only through `repo/akasha-repo` gives 177.

**The 109 are mostly not repairs.** The Postgres-backed pages layer was deleted, so at least 31 closed because their substrate went rather than because anything was corrected. Four of those — `cross-owner-relation-writes-unguarded`, `unattributed-write-clears-user-content`, `owner-guard-misses-unset-writes`, `raw-sql-upsert-bypasses-owner-guard` — are about owner guards on a write path, and a write path returns as the pages system service. What they knew belongs in that service's design before the findings go.

**The filed corpus is roughly 60% of the real set.** 25 findings are plainly pages-system and were repointed to `domain/global` when their own domain page was deleted. 64 outside the tree cite pages-system code. Around 30 finding-shaped claims live on the four initiatives' own notes and are filed nowhere — `relations.json`, `pruneEmpty`, `registryOf`, `kindsIn`, `folder-matches-a-shape` and `page-name-unique` appear in zero findings anywhere. 82 unmet Intent lines across 29 pages in the tree are filed defects that are not findings.

**Age cannot be read from this repository.** Every finding entered akasha in one bulk move and the history starts 2026-08-25. 188 of 206 carry a UUIDv5, derived from the slug with no clock. Only 10 carry a timestamp.

**Filing outpaces closing while the corpus is being made honest, and that is not failure.** A finding written down is a defect that was already there. The number to watch is live findings whose defect nobody has looked at, not the total.
