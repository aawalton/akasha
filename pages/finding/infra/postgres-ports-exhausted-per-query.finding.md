---
id: 242d691d-3c73-56b6-872c-22c375ed5f8b
slug: postgres-ports-exhausted-per-query
page-type-slug: finding
title: "Postgres ports exhausted per query"
domain-slug: domain/global
---

# Claim

The workstation runs out of ephemeral ports toward Postgres, so any tool connecting there fails outright for about a minute at a time and then recovers on its own. The harness opens and closes a fresh connection per query across some 29 call sites, and with the fleet polling on a heartbeat the `TIME_WAIT` backlog on the one tuple to `10.104.171.119:5432` came within about a thousand of the 28,232 ports available. `tcp_tw_reuse` is loopback only, so none of those ports can be recycled.

# Evidence

Measured 2026-08-16 on the workstation. The text is `connection to server at "postgres.postgres.svc.cluster.local" (10.104.171.119), port 5432 failed: Cannot assign requested address`, returned in 0.0s.

`ops db psql` is a bare `psql` with no proxy and no local bind: an strace shows one `connect()` to `10.104.171.119:5432` and no `bind()` but an `AF_NETLINK` socket. Nothing listens locally on 5432 or 6432, and `getent hosts` returns one IPv4 record.

Sampling `/proc/net/tcp` at 4Hz, sockets to that address climbed from about 1,000 to a peak of 27,198 and fell back about 60 seconds later. At the peak 26,936 were `TIME-WAIT` and 48 `ESTAB`. The range `32768-60999` gives 28,232 ports. Across 70 samples the median was 6,532 and the p90 27,161. `tcp_tw_reuse` reads 2.

The mechanism was reproduced by giving one socket a two-port range toward the same address through `IP_LOCAL_PORT_RANGE`: the second connection returned `errno=99 EADDRNOTAVAIL`, the text psql prints.

The failure is host-wide rather than psql's. At 20:36:10 -0600 the `wake-watcher` daemon threw `FailedToOpenSocket failed to connect to postgresql` in the same second `ops db psql` failed. Hard failures today fell at 08:02:07, 10:01:24, 14:01:43 and 20:36:05 local.

The churn is a connect-per-query pattern: `tools/lib/db-pages-question.ts:36` returns `new Bun.SQL(url)` per call and each caller ends it in a `finally`, one of some 29 such sites under `tools/lib/`. Steady state measured about 15 connections a second, the burst about 580.

Ruled out by measurement: the Postgres cluster at 213 of 500 connections; `nf_conntrack` at 3,284 of 262,144; descriptor limits; DNS; and a source-address flap, `ip monitor` logging no `tailscale0` event throughout.

Not established: which process produced the burst, `TIME_WAIT` carrying no owner and sampling having started after the ramp. Nor whether this is recent — the journal retains one day, so the absence of older hits is retention. Between bursts the command succeeds: 40 of 40 sequential and 300 of 300 parallel attempts connected.
