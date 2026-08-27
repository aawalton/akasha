---
id: 1c192dd5-8708-5562-9c8a-343fa7303df5
slug: rc-pass-reads-one-row-per-persona
page-type-slug: finding
title: "Rc pass reads one row per persona"
domain-slug: domain/agent-harness
---

# Claim

The Remote Control pass asks the agent row of every persona one query at a time, so a tick costs one database round trip per persona before it has looked at a single seat.

# Evidence

Read on 2026-08-15, while collapsing the wake-watcher's database clients onto one bounded client.

`listRcEnabledSeats` in `tools/lib/rc-degraded-seats.ts` walks the persona slugs in a plain loop and awaits `deps.resolveAgent(name)` inside it. The default implementation of that dependency reads one agent row by name, so the number of round trips is the number of persona rows rather than one.

The pass runs on the wake-watcher's tick, which defaults to every fifteen seconds. A live count taken the same day put the persona rows at 41, against 17 live seats — so most of those round trips resolve to nothing and are paid anyway.

This is latency and load rather than connections. The loop is sequential, so it opens no extra sockets, and the fan-out that did open them has been replaced by two batched queries in the same file. The same replacement is available here: one query reading every persona's agent row, keyed by the names already in hand.

Nothing is failing because of this. It is filed because the fix beside it is already written and this loop was left alone deliberately, rather than because anything measured it as a fault.
