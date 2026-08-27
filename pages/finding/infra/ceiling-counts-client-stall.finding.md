---
id: 0dfc5cdc-e292-5965-9048-7f94a74507fb
slug: ceiling-counts-client-stall
page-type-slug: finding
title: "Ceiling counts client stall"
domain-slug: domain/global
---

# Claim

`QueryHardCeilingExceeded` reports a stalled client as a runaway query and tells the reader to cancel it. Its value is `now() - query_start` filtered on `state = 'active'`, and a backend blocked on `ClientWrite` — the server holding a result a client has stopped reading — reports `active`. On 2026-08-15 it fired repeatedly from 16:40Z to 19:10Z on fingerprint `SELECT $1`, a bare connection health check, at 34 seconds.

# Evidence

Measured 2026-08-15 20:10Z, read-only, triaging the day's only critical alert.

THE RULE. `max by (queryid, role) (pg_query_active_seconds) > 30`, `for: 0`, group `query-performance`. Its annotation reads "Cancel with pg_cancel_backend(pid) if runaway."

THE VALUE, from `packages/infra/k8s/prometheus/synth-exporters-query-perf.ts:174-186`:

    SELECT query_id::text AS queryid, usename AS role,
           extract(epoch FROM (now() - query_start))::float8 AS seconds
    FROM pg_stat_activity
    WHERE state = 'active' AND query_id IS NOT NULL AND query_start IS NOT NULL
      AND now() - query_start > interval '5 seconds' ...

`state = 'active'` reads as excluding client waits and does not. A backend waiting on `ClientRead` is `idle`, but one on `ClientWrite` — the server unable to hand back a result the client is not reading — is `active`, and its `query_start` keeps ageing.

THE STATEMENT. Fingerprint -3688696628780506391 resolves in `db_query_fingerprints` to `SELECT $1`. A bare `SELECT 1` takes no locks and reads no blocks, so 34 seconds of it is not execution.

WHEN IT FIRED. `max_over_time(count(ALERTS{alertname="QueryHardCeilingExceeded",alertstate="firing"})[30m:1m])` over 48 hours is non-zero in six consecutive windows, 16:40Z through 19:10Z on 2026-08-15, and nowhere else. Sampled at ten-minute instants the same range reads zero throughout, each firing being short and the rule carrying `for: 0`.

THE CLIENT POPULATION. At the reading, 172 idle client backends, 164 under a day old, held by `workers/worker-supervisor` and `headscale/talos-subnet-router`, the latter SNATing every off-cluster caller.

NOT ESTABLISHED, and this is the load-bearing gap. No `ClientWrite` wait was OBSERVED on such a backend; the moment had passed by the time it was triaged, `pg_stat_activity` being a live view. The reasoning is that `SELECT 1` has no other way to spend 34 seconds. Whether cancelling such a backend would help or simply drop a healthy session is also untested.
