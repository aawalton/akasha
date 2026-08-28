---
id: 405c05a1-5c67-54ed-bc26-3fa673a4348d
slug: three-buckets-at-the-floor
page-type-slug: finding
title: "Three buckets at the floor"
domain-slug: domain/object-store
---

# Claim

`object-store` says durability is a property of each bucket but never states the floor. The floor is no redundancy at all, and three of seven buckets sit on it — including the destination for the cluster's own etcd snapshots.

# Evidence

`domains/object-store.md` Design: "Durability is a property of each bucket, not of the store." That line stands at `pages/domain/object-store.domain.md:15` now, reading "Durability is a property of each bucket, and of each prefix where one bucket's prefixes differ" — still naming no floor.

The floor, verified in the code repository. `synth-deployments.ts` runs the store at `-defaultReplication=000`, and `synth-backup.ts:4` states that losing node-04's disk loses every bucket. So an unbacked bucket has no redundancy at all rather than merely less, and durability comes wholly from the per-bucket rclone sync jobs.

`foundation.workflow.ts:295` creates seven buckets: `agent-sessions`, `loki-chunks`, `postgres-cnpg-backups`, `headscale-db`, `atlas-basemap`, `upscale`, `etcd-snapshots`.

`synth-backup.ts` runs two instances, differing in schedule and bucket list:

- line 285 — `buckets: ["postgres-cnpg-backups"]`
- line 299 — `buckets: ["loki-chunks", "agent-sessions", "headscale-db"]`

`atlas-basemap`, `upscale` and `etcd-snapshots` are in neither. `foundation.workflow.ts:273` names the last as "the daily Talos etcd-snapshot CronJob destination", so a node-04 loss takes the cluster's etcd snapshots along with what they would restore.

NOT ESTABLISHED: whether any of the three is deliberately uncovered. `upscale` is described as an on-demand serving corpus with regenerable outputs, and a snapshot destination may be judged not worth backing up twice. Nothing read here states an intent either way.

The document question rides on the same answer: whether the floor earns a second Design entry. The reading's own view, recorded as evidence rather than as a decision, is that the standing line already stops the assumption a second one would stop, so adding it would be a copy.

Re-measured 2026-08-27 in akasha, which absorbed the code repository. The floor stands: `-defaultReplication=000` is at `infra/seaweedfs/synth-deployments.ts:63`. The two backup instances stand at `infra/seaweedfs/synth-backup.ts:155` (`postgres-cnpg-backups`) and `:164` (`loki-chunks`, `agent-sessions`, `headscale-db`), so the same three buckets are in neither — `atlas-basemap`, `upscale` and `etcd-snapshots`, the last created at `infra/seaweedfs/synth-etcd-snapshot.ts:16`.

Raised by the `review-instructions` reading of `domains/object-store.md` on 2026-08-06, which cut an overwrite-semantics entry as neither a Departure nor an Absence.
