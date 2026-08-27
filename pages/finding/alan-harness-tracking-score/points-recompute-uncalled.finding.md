---
page-type-slug: finding
id: 84471e78-cd0b-50cb-ac19-a2658c6cddbb
title: "No automated path recomputes tracking points"
domain-slug: domain/alan-harness-tracking-score
---

# Claim

Nothing recomputes Alan's tracking points automatically. The `alanwalton-daily-tracking` workflow
was the only caller of `run-commit-points.ts`, and it was removed at `0e6e760a9d` because it wrote
into supabase, which no longer holds the points. No scheduled or triggered path now writes daily
point sources, persona totals, rescores or engine totals, so a stored value changes only when
something writes it by hand. Nothing goes red while that stays true.

# Evidence

Grepped the code repository for `run-commit-points`, `commit-points` and `commitPoints` across
`*.ts`, `*.yaml` and `*.json`, excluding `node_modules` and `dist`. Every hit was inside
`run-commit-points.ts` itself or in `packages/alanwalton/daily-tracking/apps.workflow.ts`, which
is the file that was removed.

Grepped every `*.workflow.ts` for cron and schedule steps. `alanwalton-calendar-sync`,
`collections-great-courses` and `collections-wandering-inn` each declare a cronjob deploy step;
the daily-tracking workflow declared none — its only step was `recompute-points`.

`kubectl get cronjobs -A` lists 19 cronjobs. The single one in the `alanwalton` namespace is
`calendar-sync`. Nothing named for points, daily tracking or a recompute stands in any namespace.

Read the step's own logs from pipeline 36 via Loki: it was patching real values day by day
(`sleepPoints`, `nutritionPoints`, `taskPoints`, `strengthVolume`, `activeCalories`) against
`https://supabase.alanwalton.com` under a service-role key, and died at 658s against a 10m step
budget having reached 2026-08-08. So the job was working and unbounded rather than broken.

Not measured. Whether the points rebuild already stands up a replacement writer somewhere — Alan
said on 2026-08-22 that the rebuild is underway, and nothing here looked for its parts. Whether
any tool in the memory or instructions repositories writes point values directly. Whether the
currently stored values are stale, and if so by how much: nothing here compared a stored number
against what a recompute would now produce. Whether anything outside the code repository invokes
the script over SSH or by hand on a schedule nobody declared.
