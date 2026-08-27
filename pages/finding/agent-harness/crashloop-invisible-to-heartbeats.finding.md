---
id: 233c24d7-88f5-5226-ad9c-dab1ee127535
slug: crashloop-invisible-to-heartbeats
page-type-slug: finding
title: "Crashloop invisible to heartbeats"
domain-slug: domain/agent-harness
---

# Claim

A supervisor child that crashes and is restarted keeps its heartbeat healthy, so a restart storm severe enough to exhaust the host's ephemeral ports is invisible to every heartbeat verdict the fleet reads.

# Evidence

Observed on 2026-08-15 while verifying project 19103.

A wedge alert named three supervisor children crashlooping inside a ten-minute window — `main-pipeline-creator` at 20 unexpected exits, `fun-points` at 18, `ci-pod-reaper-loop` at 16. At that same moment `ops worker heartbeats` reported all 29 discovered workers `OK` and `0 not OK` over a 24-hour window, `main-pipeline-creator` among them. Nothing in that verdict was wrong: a child that dies and is restarted emits its next beat, so the storm and a healthy worker produce the same reading.

What the storm did leave was 26,234 sockets in TIME-WAIT to `postgres.postgres.svc.cluster.local:5432`, against an `ip_local_port_range` of 32768–60999 — 28,231 ports. Every verb on this workstation opening a direct database connection then failed intermittently, `ops seat hook-decisions` and `ops seat halt-census` refusing eleven consecutive invocations at exit 70, and seven database-backed tests under `tools/tests/` failing in `ops instructions run-checks`.

The failure did not name its own cause. Most attempts returned `FATAL: remaining connection slots are reserved for roles with the SUPERUSER attribute`, which reads as a full server — while the server stood at 254 connections of a `max_connections` of 500. Only one attempt returned `Cannot assign requested address`, which is the local exhaustion stating itself.

It drained on its own about twelve minutes later, without intervention: TIME-WAIT to that port fell to 5,206, six consecutive `ops db psql` probes succeeded, and the alert refreshed to `recovering` with no offenders. Both readers then answered clean.

So the gap is not that anything failed to recover. It is that the instrument the fleet consults for worker health cannot distinguish a worker running from a worker being restarted into the ground, and the blast radius of the second reaches every process on the host rather than only the child.
