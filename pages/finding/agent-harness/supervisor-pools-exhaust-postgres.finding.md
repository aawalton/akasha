---
id: f2d94871-ee2c-5eea-9c6e-c2a9ae4ae4b1
slug: supervisor-pools-exhaust-postgres
page-type-slug: finding
title: "Supervisor pools exhaust Postgres"
domain-slug: domain/agent-harness
---

# Claim

Supervisors hold Postgres connection pools for their whole life, and enough of them stand together that no new seat can boot: credential selection reads the database, a refused connection marshals as no credential, and the supervisor exits before it reaches anything else.

# Evidence

Measured on this workstation on 2026-08-15, while porting the supervisor's seat-spawn decisions.

`ops db psql` cannot connect at all: `FATAL: remaining connection slots are reserved for roles with the SUPERUSER attribute`. A direct `Bun.SQL` open answers the same, or `sorry, too many clients already`. It stood across forty minutes of retries.

`ss -tn state established | grep -c :5432` counts 395 established connections to Postgres from this host, every one owned by a `bun` process. They concentrate in `tools/run-supervisor.ts` processes: three hold 52 apiece, three hold 42, one holds 40. There are 24 supervisors running.

It is a pool per file rather than an unbounded leak. A supervisor 22 hours old holds 52; one 25 minutes old holds 42 — fifty times the age for a quarter more connections.

`tools/lib/supervisor-account-config.ts` caches one `Bun.SQL` handle module-level (`connection ??= new Bun.SQL(url)`) and `tools/lib/supervisor-agent-name-db.ts` caches another. Both are resident in every supervisor for its whole life and neither calls `end`. Bun opens a pool per `Bun.SQL`. The neighbours reading the same database per call, `tools/lib/db-agents.ts` and `tools/lib/supervisor-rebind-deps.ts`, open and `end` instead.

`ops seat start` mints the row and the supervisor then exits on boot with `No managed credential available` at `tools/lib/supervisor-agent.ts:104`. Called directly, `getBestCredential` prints `PostgresError: sorry, too many clients already` and returns null — its `try`/`catch` turns an unreachable database into an absent credential, so nothing above it can tell a saturated database from an account never onboarded. A seat that dies now cannot be revived either.

This predates the #19170 port and is independent of it: the supervisors holding the connections started before that change landed, and the failure is in credential selection, which runs before any seat-spawn decision is asked for.

Whether `end({ timeout: 0 })` promptly releases a pool could not be measured, no connection being available to release.
