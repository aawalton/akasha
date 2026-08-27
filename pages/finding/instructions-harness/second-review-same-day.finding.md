---
id: 44a3014a-602e-5985-b090-d41af68aeab6
slug: second-review-same-day
page-type-slug: finding
title: "Second review same day"
domain-slug: domain/global
---

# Claim

Almost every document `tools/stale-reviews.ts` names is one it declares it cannot measure. Its header says it cannot see "a second review landing on the day of an earlier one", and over-reports there. On 2026-08-06 it named 59 owed documents and 56 already carried `reviewed-at: 2026-08-06`. A reading landing on any of those 56 also cannot record itself: the record is a day, there is no later date to write, and each such reading adds churn the next run counts again.

# Evidence

Measured on 2026-08-06 during a review-documents pass. `bun tools/stale-reviews.ts` reported 280 live documents and 59 owed. Reading `reviewed-at:` from the frontmatter of all 59 gave 56 at 2026-08-06, 2 at 2026-08-05 and 1 at 2026-08-04. The header quotation is from `tools/stale-reviews.ts` as it stands at commit 6f95a18b.

The unrecordable half is reported secondhand: a review-instructions seat on `domains/agent-governance.md` reported that `reviewed-at` had already been moved to today by commit a513823e for an earlier reading, and that the edit verb needs a differing pair. I did not attempt the write myself.

Not measured: whether the 56 were each genuinely read today or merely stamped by a sweep, and how much of the counted churn predates the earlier reading. One data point against pure redundancy — the first subject in this pass, already stamped today, still yielded a real defect and a landed cut.
