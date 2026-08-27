---
id: 271662c6-1b5d-53fe-8f66-dc293fda733d
slug: shape-delivery-unmeasured
page-type-slug: finding
title: "Shape delivery unmeasured"
domain-slug: domain/global
---

# Claim

Nothing reports a shape that has stopped delivering. Every instrument on the sync path
measures size or liveness, so a frozen shape reads as a healthy system while browsers are
served day-old rows.

# Evidence

Measured 2026-08-12, against the freeze recorded at
`pages/finding/electric/electric-shape-stopped-delivering.finding.md`. Three project rows stood a day stale on
Alan's board for roughly two hours, and every reading available was green: `/v1/health`
answered `active`, the pod had run 40 hours with no restarts, `electric_slot_default` was
active and caught up to `pg_current_wal_lsn`, and shape storage held 546 MB across 31 shapes,
far under any threshold. What surfaced the fault was Alan disbelieving a screen and setting
the same value on a row three times.

The alert rules for Electric are storage-high and storage-critical in GiB, an age alert over
the exporter's own measurement file, and an absent-metric alert
(`packages/infra/k8s/prometheus/synth-alerts-electric-storage.ts`). All four ask how big the
storage is or whether the exporter is still writing, and none asks whether a shape's log is
still moving. Electric's own `/metrics` publishes eight curated metrics and storage bytes is
not among them, which is why the sidecar exporter exists at all.

The one instrument that can see delivery is `@shared/pages-drop-detector`, and it is a CLI a
person runs: `ops drop-detector capture` subscribes for a capture window and tears down
afterwards. No cronjob in any namespace schedules it, and nothing else subscribes to a shape
to compare what it carries against the table.

A reading that would have caught this exists in one line: the newest `updated_at` a shape's
log carries, held against the newest `updated_at` in the rows that shape selects.
