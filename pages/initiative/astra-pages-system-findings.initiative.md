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

**The method is settled: walk `domain-parent-slug` from `domain/pages-system` across every page type, then count findings whose own `domain-slug` names a node in it.** 375 nodes. 93 findings at `66e3ce722`, still 93 at `6b982e1e4` 127 commits later, over a corpus that moved 3,092 to 3,097. Stable while the corpus is not, which is what a count of this kind must be before it means anything.

**The count is close to complete and was never the number at risk.** 104 candidates outside the subtree, by two sweeps that barely overlap; 90 read whole; **genuine rehomes zero**. What sits outside is not mislaid inventory but roughly thirty correct findings, in other domains, already answering what delegates are being paid to derive. The instrument does not undercount the work. It is blind to work already done, which no recount fixes. The concern governs, not the code: a finding in `shared/pages-ui` about keyboard discoverability is ours to repair and not ours to count.

**Every count of this corpus is a reading with a commit attached, never a fact.** The first version of this paragraph gave 137 with no commit, which is the same error as the line it replaced — "29 sorted and fails the other 3,236" was true at `1c8e5677b` and was quoted here as though it described now. A number taken from a corpus that other agents are changing goes stale in hours, and nothing about the number says so.

`findings-sorted` is still red — 2,379 sorted under 327 domain folders, 731 not sitting under the domain they name, no truncation in the list, measured at `d8b608167`. But red now means misfiled rather than unreadable: every finding names a domain that exists, none carries a bare number, none is missing its page-type prefix, none is missing a slug, and `domain/946` appears nowhere.

**Five costumes of this miscount are on record, and the fifth was built by someone who had just read the other four:** a folder-anchored glob, a `pages/`-only walk, a directory-scoped positive control, a page-type-restricted parent walk, and a keyword sweep over finding bodies. Each produced a clean number that looked like an answer. A warning about an instrument does not fire while you are building one.

**The set, surveyed 2026-08-28 at `1c8e5677b`: 206 open in the tree.** 85 live, 109 whose defect is gone, 1 wrong, 11 unverified. Taking out the 29 that reach the tree only through `repo/akasha-repo` gives 177.

**The 109 are mostly not repairs.** The Postgres-backed pages layer was deleted, so at least 31 closed because their substrate went rather than because anything was corrected. Four of those — `cross-owner-relation-writes-unguarded`, `unattributed-write-clears-user-content`, `owner-guard-misses-unset-writes`, `raw-sql-upsert-bypasses-owner-guard` — are about owner guards on a write path, and a write path returns as the pages system service. What they knew belongs in that service's design before the findings go.

**The filed corpus is roughly 60% of the real set.** 25 findings are plainly pages-system and were repointed to `domain/global` when their own domain page was deleted. 64 outside the tree cite pages-system code. Around 30 finding-shaped claims live on the four initiatives' own notes and are filed nowhere — `relations.json`, `pruneEmpty`, `registryOf`, `kindsIn`, `folder-matches-a-shape` and `page-name-unique` appear in zero findings anywhere. 82 unmet Intent lines across 29 pages in the tree are filed defects that are not findings.

**Filing outpaces closing while the corpus is being made honest, and that is not failure.** A finding written down is a defect that was already there. The number to watch is live findings whose defect nobody has looked at, not the total.

**Splitting inflates the count with no defect behind it, and this seat caused it.** Reshaping an over-bound finding to fit its type often splits one page into several — 11 new pages came out of 12 reshapes in a single slice. Pages-system went 93 to 128 in an hour on 2026-08-28, and part of that is the same defects wearing more pages. Three different things move this count: a defect found, a defect written down, and a page divided. Only the first is news, and the number does not say which it was.
