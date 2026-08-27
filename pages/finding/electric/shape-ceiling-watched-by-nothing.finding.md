---
id: 926f30d2-f67f-543c-9c7b-03d0c14c24db
slug: shape-ceiling-watched-by-nothing
page-type-slug: finding
title: "Shape ceiling watched by nothing"
domain-slug: domain/global
---

# Claim

Every alert rule loaded against Electric's storage reads bytes. Nothing reads `electric_shape_count`, so the `ELECTRIC_MAX_SHAPES` ceiling is enforced by Electric's own eviction and watched by nobody.

Reaching it is not a quiet event: eviction rotates a shape handle, and a client holding the rotated handle is answered 409 and replays from offset zero, which is the symptom this area was opened for. The byte alerts do not cover it: a store can sit far under 8 GiB at its full complement of shapes.

# Evidence

Read 2026-08-11 at 01:45Z against the live cluster.

MEASURED. Prometheus `/api/v1/rules` returns four rules naming Electric, and all four query `electric_shape_storage_bytes` or `electric_shape_storage_measurement_age_seconds`:

- `ElectricShapeStorageHigh` — bytes / 1024^3 > 8
- `ElectricShapeStorageCritical` — bytes / 1024^3 > 14
- `ElectricShapeStorageMeasurementStale` — age > 300
- `ElectricShapeStorageMetricAbsent` — absent(bytes)

No rule names `electric_shape_count`. The gauge is published — the exporter's `/run/exposition/metrics` carries it — and is scraped; it is simply not read by any rule.

`ELECTRIC_MAX_SHAPES` is set to 100. Unset, Electric never schedules its eviction timer at all; set, eviction is what enforces the ceiling, and eviction is handle rotation.

THIS IS NOT A HEADROOM READING. The live count is 32, which is nowhere near 100, and nothing here reports a part sitting close to its bound. What is claimed is that no instrument exists between the gauge and the ceiling at any value.

NOT MEASURED. What warning threshold would be right, which is a judgment about how much notice a handle rotation needs rather than something the store can be asked. Whether the shape count has ever actually reached 100 in this deployment — the gauge was wrong until tonight, so the historical series records bucket counts rather than handle counts and cannot answer it. Whether Electric emits its own signal on eviction that could be scraped instead of alerting on the gauge.
