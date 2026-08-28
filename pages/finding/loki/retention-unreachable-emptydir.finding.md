---
id: f23d5b4a-f54e-5f50-a67d-a1a89a188054
slug: retention-unreachable-emptydir
page-type-slug: finding
title: "Retention unreachable emptydir"
domain-slug: cluster-service/loki
---

# Claim

Loki's configured `retention_period: 168h` is unreachable by construction: chunks live on an `emptyDir` volume with no PersistentVolumeClaim, so retention resets to zero on any pod roll, eviction, drain or OOM, and is further capped by the volume's 4Gi `sizeLimit` rather than by time.

# Evidence

Project #16445 (domain loki, status someday_maybe). Filed by aranya from #16407.

Founding evidence (aranya, measured live 2026-07-26T07:45Z): pod loki-946f6f778-lspp5 (deployment/loki, namespace loki), 0 restarts. Volumes: data -> emptyDir sizeLimit 4Gi, NO PersistentVolumeClaim; tmp -> emptyDir sizeLimit 256Mi. Config: retention_period: 168h, retention_enabled: true. Pod start 2026-07-26T01:53:36Z, uptime at measurement 5h50m.

Two independent caps, neither the configured one: (1) pod lifetime — emptyDir is created at pod start and deleted at pod termination, so retention_period: 168h can only bind on a pod that has survived seven days; (2) the 4Gi sizeLimit — even on an immortal pod, retention is capped by volume rather than time, so it is inversely proportional to log volume and shortest exactly during incidents.

Why a row rather than a note: an expired Loki query returns an empty result set rather than an error, indistinguishable from "that event never happened" — the anti-signal shape dalla named on #16344, which the same author had already met twice that night (a zero-count read as absence when it was an empty container; an empty `psql -At` set rendering identically to zero).

Precedent: #16216 found `/var/log/kernel.log` rotates at ~5MB size-based, giving node-06 (CI-reserved, busy) 3h26m retention against node-01's 18 days — same structure, a setting reading as a duration but bounded by volume, shortest under load. Both ground-layer instruments reached for during an incident have retention that collapses during incidents.

Not yet decided whether the fix is a PVC, an object-store backend (SeaweedFS is already in-cluster; Loki already speaks S3; `loki-s3-creds` exists, mirrored from `seaweedfs-creds`), or downgrading the claim to match reality. Existence Check applies to the `168h` literal itself.

Row captured but never defined (no objective was written); this evidence is its capture moved off the retired `notes` attribute on 2026-08-15.
