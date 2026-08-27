---
id: a9a7c6fe-b137-5542-a745-a2ae993a648d
slug: ephemeral-ports-exhausted
page-type-slug: finding
title: "Ephemeral ports exhausted"
domain-slug: domain/global
---

# Claim

The workstation exhausts its ephemeral port range under normal agent load, and `ops db psql` fails with a hard connection error rather than waiting for a port.

# Evidence

Observed 2026-08-16 while running post-deploy verification for 19231.

Two consecutive `ops db psql` invocations, five seconds apart, refused with a connection error naming the postgres service and port 5432, reading `Cannot assign requested address`.

The command's own stderr is unambiguous that nothing ran, so the failure is not silently readable as an empty result.

`ss -tan` at that moment: 28,446 sockets in TIME-WAIT, 446 established, against `/proc/sys/net/ipv4/ip_local_port_range` of 32768-60999, about 28,200 ports. TIME-WAIT alone accounts for the whole range.

A third attempt moments later succeeded, so the condition drains and returns rather than standing. The Supabase HTTP path was unaffected throughout: `ops seat outbound-wake` answered normally while psql was refusing, which is why this reads as socket pressure rather than a database or network fault.

What this does not settle: which process or processes open the connections that accumulate in TIME-WAIT, whether the rate is ordinary fleet load or one runaway caller, and whether any tuning already stands. No reading here counts connections per process.
