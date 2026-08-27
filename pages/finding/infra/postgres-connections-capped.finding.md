---
id: bd3e0cbc-0181-53cc-94f4-dec29d139f2f
page-type-slug: finding
title: "Postgres connections capped"
domain-slug: domain/global
---

# Claim

Postgres is at its connection cap, and one role holds almost all of it.

# Evidence

`bun test tools/tests/seat-flex.test.ts` failed twice in a row on 2026-08-15 with `PostgresError: remaining connection slots are reserved for roles with the SUPERUSER attribute` (errno 53300), on the one test that opens a connection to the live store. The other nine passed.

A count taken straight after, over `pg_stat_activity`, put `max_connections` at 500 and the open backends at about 514: `service_role` 448, `electric` 21, `supabase_realtime_admin` 16, `authenticator` 13, unnamed 8, `postgres` 7, `streaming_replica` 1.

The reading is one moment, not a window, so it says nothing about how long this has stood or whether `service_role` climbs and settles. Nothing here says which caller opens under `service_role` or whether those connections are pooled.
