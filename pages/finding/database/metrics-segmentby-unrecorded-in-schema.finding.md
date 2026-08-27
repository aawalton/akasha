---
id: 314f5e4a-42d8-539e-ac62-325932de675d
slug: metrics-segmentby-unrecorded-in-schema
page-type-slug: finding
title: "Metrics segmentby unrecorded in schema"
domain-slug: domain/database
---

# Claim

Thirteen comments across six live source files state that `metric_name` is the TimescaleDB compression segmentby on `public.metrics`, and several derive a design constraint from it — the `MetricName` union kept small, a label placed in `labels` rather than in the metric name. The tracked schema records no such setting on that table or on the other two the tree calls hypertables, so the constraint is enforced at the type level on a ground nothing in the repository can check.

# Evidence

Measured in the code repo at HEAD `13135651993c19af09ce41b6295264191071d3c1` on `main`, 2026-08-07. `rg "segmentby"` returns 13 hits, none of them SQL:

- `packages/shared/metrics/access/src/types.ts:7` — the module docblock gives the segmentby as the reason cardinality discipline lives at the type level and callers cannot pass an arbitrary string.
- `packages/shared/metrics/access/src/metric-labels.ts:276`, `:277`, `:297`, `:312`, `:328`, `:376`, `:429` — seven comments deciding what goes in a label rather than in the metric name, each resting on `metric_name` staying "the single segmentby".
- `packages/infra/k8s/prometheus/synth-exporters-{git-mirror:61,domain-expiry:48,macbook-inference:29}.ts` and `packages/infra/ci/worker/src/pure/build-resolution-metric.ts:14` — the same claim again.
- `packages/shared/worker-runtime/src/events-cursor.database.test.ts:184` — the same class of claim about `public.events`.

The generated snapshot holds none of it. `schema/public/tables/metrics.sql` carries the `CREATE TABLE`, a primary key on `(inserted_at, id)`, three indexes, a grant and a replica identity, and nothing else. `rg -i "compress"` over `schema/` returns two hits, both in `functions/trigger_pipeline.sql` about TOAST blobs. `rg "create_hypertable"` over `packages/shared/supabase/database/` returns one hit, a type signature in `src/generated/database.ts`. The only route to the answer is querying `timescaledb_information.compression_settings` against the live database.
