---
id: 01a02361-4c8e-7000-9f2a-3d8b5a1c7e04
slug: monitor-fetches-blind-on-retired-table
page-type-slug: finding
title: "Seven monitor fetches have gone blind on the retired table"
domain-slug: domain/global
---

# Claim

`tools/lib/devops-monitor/pages-rows.ts` reaches `public.pages` in raw SQL, and that table no longer exists, so seven of the daemon's fetches fail on every pass. Each has its own catch, so the daemon stays up and reports nothing wrong; the wedges behind them log `state=unobserved` rather than going red. The delivery system's watches are dark and have been since the table went.

# Evidence

Measured 2026-08-22. `select to_regclass('public.pages')` answers null. `journalctl --user -u devops-monitor-daemon.service` over ten minutes carries 70 lines of `PostgresError: relation "public.pages" does not exist`, seven per pass, one a minute: `fetchAppDeployExpectations`, `fetchCoveredMainShas`, `fetchDispatchingBacklog`, `fetchRecentlyEjectedEntries`, `fetchMainPipelines`, `fetchMergeQueueSlice`, `fetchRecentBatches`. The wedges reported as unobserved are `main-pipeline-overrun`, `dispatch-stall` and `deploy-staleness`.

Four literal `public.pages` references stand at lines 27, 44, 96 and 139, reached from `snapshot/db-slices-merge-queue.ts` and `snapshot/app-deploy-expectations.ts` through the one `Promise.all` in `snapshot.ts`, run by `services/devops-monitor-daemon.ts`. No `ops` command reaches any of it.

This is the only literal `public.pages` left in the instructions repository, and it is not persona data: the page types it addresses are `pipeline`, `workflow` and the merge-queue slugs, all of which are file-backed in the memory repository. So the data exists and the module is simply not going through the file reader.

`devops-monitor-slice-failed-read.test.ts` reaches both slice modules with a stub pool, which is why no test run surfaces this.

Found while surveying persona row readers for project 19446. Not persona work, and not repaired there. What the fetches should read instead, and whether the raw SQL shape survives the move, is a call this did not make.
