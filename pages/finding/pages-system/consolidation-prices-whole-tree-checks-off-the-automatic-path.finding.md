---
id: 05469933-bde1-5ffe-8e29-ff185d1929b6
page-type-slug: finding
title: "Consolidation prices whole-tree checks off the automatic path"
domain-slug: domain/pages-system
---

# Claim

A whole-tree check now walks 59,024 claimed pages and takes 11.8 seconds, so the cheapest way to keep it under the one-second bound the standard suite sets is to move it off the automatic path, where it still exists, still passes when anyone runs it, and no longer runs.

# Evidence

Observed 2026-08-28 by seat amy while repairing stale fixtures. Every page in every repository moved into this one, and a check that measured one repository's own claim now measures the whole store. `pages/domain/test-on-checks.domain.md` settles what happens next: "A test too slow for the checks is an on-demand test instead."

`tools/tests/checks-report-emptiness.test.ts` held a case named "pages-hold-shape judges rather than skipping, over the pages this repo claims". It threw ENOENT on a root named at a path that does not exist, and had done since the pages consolidated. The throw read as a failure nobody separated from the others, so the case had never run.

Repaired, it runs for the first time and takes 11.8 seconds, measured directly rather than on report. `pagesHoldShape` walks 59,024 claimed pages. It moved to `checks-report-emptiness.on-demand.test.ts` with a 60-second ceiling.

Every whole-tree check faces the same arithmetic, and the remedy the domain names is removal from the automatic path.

Two pressures point the same way. `checks-ceiling` was measured at 123.3s and then 124.9s inside one night against a 120s bound — crossed by a widening margin. `pages-hold-properties`, repaired the same night from 429 failures to zero, takes about fifteen minutes over the same population.

A ratio was withdrawn rather than corrected. It first claimed the cost rose roughly sixtyfold; that fails crude arithmetic: 74,389 of 89,410 tracked files sit under `pages/`, so a claimed population of 59,024 is roughly the pages tree, and a sixtyfold rise would require a prior claim of about a thousand pages rather than the tens of thousands it appears to have been. The direction is not in doubt — `story-chapter-royal-road` at 17,905, `skill` at 8,972, `class` at 8,380, `music-song` at 4,422 and `book` at 1,579 plainly arrived with consolidation — but the size is unestablished.

Not measured: that ratio; how many checks already sit on the on-demand path for cost rather than for their subject; or when each moved.
