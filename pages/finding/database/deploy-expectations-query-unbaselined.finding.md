---
id: 83f7350f-e67a-58e0-8042-3488edd50023
slug: deploy-expectations-query-unbaselined
page-type-slug: finding
title: "Deploy expectations query unbaselined"
domain-slug: domain/database
---

# Claim

The fingerprint `3095893069018364090` resolves to a documented product query that was deliberately shaped for speed, and it has sustained means far above the 250ms budget for seventeen days without being fixed or baselined. Because absence from the ratchet baseline is what qualifies it, it re-fires whenever it re-qualifies, and nothing about the alert's two remedies has been taken in that time.

# Evidence

`bun ops query-perf triage 3095893069018364090` reports `ratchet_baseline absent`, `first_seen 2026-07-26T00:25:01Z`, `lifetime_calls 20,927` over `active_days_utc 17`, and windows: 30m 28 calls at 839.3ms/call, 2h 115 at 211.1, 24h 1,382 at 84.0, 7d 9,529 at 897.1.

The query text it prints matches `packages/shared/pages/access/src/pg/load-latest-app-deploy-expectations.ts:65` — `WITH names AS (SELECT unnest($1::text[]) AS workflow_name)`, the LATERAL per name, the `attributes @>` predicates and the `ORDER BY p.seq DESC LIMIT`. It is parameterised across `$1`–`$15` in a committed source file, so it is product rather than a hand-typed prompt; the triage's own provenance block leaves this open, reporting `roles service_role` and no `postgrest` or `pages_marker` token, each of which it states proves nothing either way.

The site is deliberate. The header above the function records that every predicate including the pipeline-to-workflow join is `attributes @>` containment rather than `->>` equality, "per `check-pages-gin-friendly-sql`", and that this "lets the planner walk main pipelines by `seq DESC` and probe workflows through the GIN index, which measured ~8x faster than the `->>`-cast join driving from the workflow side."

The 7d mean of 897.1ms against the 24h mean of 84.0ms puts the cost in bursts rather than in every call. The triage reports `support 0` for every window, meaning no bucket carried the ten calls its median needs, so no per-call median is available at any window.

`packages/infra/k8s/prometheus/query-tail-baseline.generated.ts` carries other LATERAL-over-`public.pages` fingerprints at `sampleMeanMs` from 287 to 2947.6, so shapes of this family slower than this one stand baselined while this one is not.

Not established: what the bursts are, and whether the query regressed at all — nothing here compares it against its own earlier windows. No `EXPLAIN` was run, and no caller was traced.
