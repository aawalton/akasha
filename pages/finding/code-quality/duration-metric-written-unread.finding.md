---
id: 09b6c0d5-b71f-5308-8313-fdbcd150b3ec
page-type-slug: finding
title: "Duration metric written unread"
domain-slug: domain/code-quality
---

# Claim

The `ops.command.duration_ms` metric has a live write path and no reader: `get_status_bar_snapshot` no longer computes the two averages that were its only consumers, and the one docblock describing that reader still says it exists.

# Evidence

Found on 2026-08-07 while emptying `dirty/skills/alan-harness/findings.md`, which on 2026-07-28 predicted this state as a consequence of a then-pending contract migration. That document is queued for removal, the predicted state has arrived, and every reading below was taken against `~/code` rather than carried over.

The readers are gone. `packages/shared/supabase/database/schema/public/functions/get_status_bar_snapshot.sql` is 324 lines carrying neither `duration` nor `metric` outside the function's own name and its grants, and `rg -ln 'ops\.command\.duration_ms' --glob '*.sql'` across the repo returns nothing. The two timer averages that fed the status bar's retired slots are computed nowhere.

The writes remain. `rg -n 'ops\.command\.duration_ms'` returns 27 lines over 14 files; the live ones are `packages/shared/cli/src/ops/emit-metric.ts`, `.../ops/cli.ts`, `packages/infra/local-executor/src/execute-step.ts`, `packages/shared/metrics/access/src/build-ops-command-metric.ts` and `.../src/types.ts` lines 48 and 97. The rest are tests, comments, or `packages/infra/ci/worker/src/pure/build-resolution-metric.ts:34`, which excludes the name from a type rather than reading it.

The one piece of prose about the reader is stale the other way. `packages/shared/status-bar-access/src/get-status-bar-snapshot.ts:20` reads "The RPC still EMITS two `ops.command.duration_ms` timer averages (`checkMetric` / `deployMetric`)", and calls dropping them a migration still to be applied. A reader asking whether anything consumes the metric meets that sentence and stops.

Not established: whether the emission should go. The finding this replaces recorded a reason to leave it — the metric carries a `retired_status` label whose presence is load-bearing for a different measurement. Not re-measured here.
