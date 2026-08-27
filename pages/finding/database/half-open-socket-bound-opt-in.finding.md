---
id: f00fe9b8-e115-5acd-9236-d2e1e0e48c42
page-type-slug: finding
title: "Half open socket bound opt in"
domain-slug: domain/database
---

# Claim

The only bound that survives a half-open Postgres socket, `createServicePgPool`'s `queryTimeoutMs`, is set at 3 of 110 call sites, and nothing measures which pools are without it.

# Evidence

`packages/shared/supabase/server/src/pg.ts` says the exposure itself, at `queryTimeoutMs`'s own declaration: it is "the ONLY one of the two that bounds a **half-open TCP socket** … the backend's `statement_timeout` error cannot traverse a dead socket, so without this a query on a half-open connection hangs until the kernel abandons the socket (~2h of retransmission backoff — the #14923 pages-fs-projector boot wedge)." Its default is unset, and the docblock gives the reason as compatibility: "so the fleet's existing callers are byte-for-byte unaffected." `keepAlive` is opt-in on the same grounds.

What is defaulted is the bound that cannot help here. `DEFAULT_STATEMENT_TIMEOUT_MS = 300_000` is applied to every pool as a libpq startup option, so a bare pool looks bounded and is not.

Counted at code HEAD `ecf5f9518f`, excluding `node_modules`, `dist` and `*.test.ts`: 110 `createServicePgPool(` call sites. `rg -n queryTimeoutMs` over the same set returns three pools — `packages/shared/pages/fs-projector/src/daemon.ts:65`, `packages/infra/ci/orchestrator/src/main-pipeline-creator.worker.ts:114` and `packages/agents/shared/work-halt.ts:89`. Two of those set `keepAlive: true`; the only other `keepAlive: true` in the tree is on the LISTEN connection at `packages/shared/worker-runtime/src/listen.ts:357`.

The long-running workers creating a bare pool include `automation-scheduler`, `automation-orchestrator`, `apns-push-notifier`, `stale-project-detector`, `pages-versions-projector`, `notification-retention` and `story-length`.

No check covers it: `packages/infra/checks/src/checks/` holds no check naming `createServicePgPool`, `queryTimeoutMs` or `keepAlive`.

Distinct from the standing `infra/worker-safety-knobs-default-off`, which counts `tickDeadlineMs`, `startupDeadlineMs` and `livenessBeacon` over 34 workers on `runLongRunningWorker`. That one bounds a worker's own boot and ticks; this is the pool-level bound covering every query for the life of any process, worker or not, over a population of 110 rather than 34.
