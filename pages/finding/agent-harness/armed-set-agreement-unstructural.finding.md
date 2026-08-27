---
id: f0d9c6b4-fbf8-5d92-b1ef-8d3135b06bc4
page-type-slug: finding
title: "Armed set agreement unstructural"
domain-slug: domain/agent-harness
---

# Claim

The wake side and the send side of the armed-seat set agreed by construction while both stood in
the code repository, and the port has made them two implementations that presently match with
nothing reporting the day they stop.

# Evidence

`@agents/routing-core` exports two functions over one body: the assembly the wake watcher reads,
and `decideSeatWakeByName`, which answers "would this inbound revive this seat" for `agent send`'s
dead-recipient guard. Because both read the same body, the guard could not disagree with the
watcher — the agreement was structural rather than maintained.

The assembly now stands here as `tools/lib/wake-armed-specs.ts`, carried across with
`tools/lib/wake-watcher-registry.ts` under #18892. The send-side guard did not come: it is reached
from `@agents/cli`, which is in no port queue, and nothing in this repository calls it or reaches a
send path that does. The seat that landed the assembly reported this rather than leaving it, and
said plainly that porting harder does not fix it.

What a drift would look like is why this is worth a finding rather than a note: a seat that
`agent send` delivers to and the watcher never revives. The send succeeds, the row is written, every
surface reads healthy, and the recipient waits. No test on either side spans the boundary, and the
digest arm on the ported assembly holds it against the code repository's assembly alone.

Fifteen of that suite's twenty-five tests could not cross for a related reason: they drive
`runWakeWatcherTick`, so what is proven here is what the specs ARE and nothing about what a tick does
with them. Whether an armed spec actually revives a dormant row is proven only in the code repository.
