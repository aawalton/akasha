---
id: f53608f7-5b6f-558e-bc87-2c937d2e78ff
page-type-slug: finding
title: "Ephemeral ports exhausted to Postgres"
domain-slug: domain/query-performance
---

# Claim

This workstation exhausted its ephemeral port range connecting to Postgres, so queries from it could not connect at all. At the moment of failure 28,153 of the 28,231 available ports stood in TIME-WAIT to port 5432, and the host was opening around 400 new outbound connections a second. Something on this host reaches Postgres with a fresh connection per operation rather than through a pool.

# Evidence

Measured at 02:51 UTC on 2026-08-16, after `ops db psql` failed twice in succession with `psql: error: connection to server at "postgres.postgres.svc.cluster.local" (10.104.171.119), port 5432 failed: Cannot assign requested address`, reporting that no connection was made and nothing ran.

`net.ipv4.ip_local_port_range` is 32768 to 60999, which is 28,231 ports.

`ss -tan` counted 28,153 sockets in TIME-WAIT to 10.104.171.119:5432, against 28,356 sockets in TIME-WAIT in total, 451 established and 29,109 TCP sockets overall. The TIME-WAIT local ports run contiguously from 32768 upward, so the whole range had been cycled.

Two readings of `Tcp: ActiveOpens` from `/proc/net/snmp`, 4.33 seconds apart, gave 15,990,828 and 15,992,558 — a rate of about 400 new outbound connections a second. Lifetime ActiveOpens stands at 16.0 million against PassiveOpens of 405,540.

Across those same readings the TIME-WAIT count to port 5432 fell from 28,153 to 9,705 to 8,695, so the burst that filled the range had already passed while the connection rate continued.

Established connections to port 5432 are held by several `bun` processes carrying two to four sockets each, which is what a pool looks like. A socket in TIME-WAIT names no process, so what opened the churned connections is not identified here.

`ops db psql` failed the same way three times around 22:05 UTC on 2026-08-15 and again at 06:35 UTC on 2026-08-16, recovering on its own each time — three occurrences roughly four hours apart, which fits a scheduled job rather than steady load. At the 06:35 failure the count stood at 28,158 and drained to 17,647 within 22 seconds, while `ActiveOpens` advanced only 27 in 3.2 seconds, so the burst had already ended.

`net.ipv4.tcp_tw_reuse` is 2, which permits reuse on loopback only, and `tcp_max_tw_buckets` is 262,144, well above the count reached, so it is not the limit.

The database's own health says nothing about this: the failure is in the path from this host, and no connection reached a server.
