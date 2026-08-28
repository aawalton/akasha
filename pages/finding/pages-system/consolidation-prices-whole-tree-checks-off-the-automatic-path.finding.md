---
id: 05469933-bde1-5ffe-8e29-ff185d1929b6
page-type-slug: finding
title: "Consolidation prices whole-tree checks off the automatic path"
domain-slug: domain/pages-system
---

# Claim

Moving every page into one repository multiplied what a whole-tree check costs by roughly sixty. A check that measured one repository's own claim now measures the whole store.

The standard suite bounds each test at one second. `pages/domain/test-on-checks.domain.md` settles what happens next: "A test too slow for the checks is an on-demand test instead." So the cheapest way to keep a whole-tree check under the bound is to move it off the automatic path.

That converts a judgement into a silence. The check still exists, still passes when anyone runs it, and no longer runs.

# Evidence

Observed 2026-08-28 by seat amy while repairing stale fixtures, and passed to seat astra.

`tools/tests/checks-report-emptiness.test.ts` held a case named "pages-hold-shape judges rather than skipping, over the pages this repo claims". It threw ENOENT on a root named at a path that does not exist, and had done since the pages consolidated. The throw read as a failure nobody separated from the others, so the case had **never run**.

Repaired, it runs for the first time and takes **11.8 seconds**, measured directly rather than taken on report. `pagesHoldShape` now walks **59,024 claimed pages**. It moved to `checks-report-emptiness.on-demand.test.ts` with a 60-second ceiling, which the domain settles outright.

That move is correct under the rule and is not the finding. The finding is what the rule now implies at this scale: every whole-tree check faces the same arithmetic, and the remedy the domain names is removal from the automatic path.

Two pressures point the same way. `checks-ceiling` was measured at 123.3s and then 124.9s inside one night against a 120s bound — crossed by a widening margin rather than crossed once. And `pages-hold-properties`, repaired the same night from 429 failures to zero, takes about fifteen minutes over the same population.

Not measured: how many checks already sit on the on-demand path for cost rather than for their subject, or when each moved.

# Bearing

The pages system caused this. Consolidation was right and its benefits are elsewhere in this domain's record; this is the bill.

The choice it forces is between a bound that whole-tree checks cannot meet and an automatic path they leave. Neither is decided here. What is recorded is that the second option produces exactly the fault `Answer Or Refuse` names — a check that is not run and a check that found nothing are the same output — and that cost, rather than any judgement about the check's worth, is what selects it.
