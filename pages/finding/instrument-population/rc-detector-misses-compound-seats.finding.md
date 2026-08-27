---
id: 179adf3d-3dcf-5abf-8ad0-b37f9dfeccb4
page-type-slug: finding
title: "Rc detector misses compound seats"
domain-slug: domain/instrument-population
---

# Claim

The supervisor's RC-degraded detector enumerates bare persona slugs, so a persona seat whose name carries a role suffix is outside its population by name shape alone — three of the nine live persona-family seats today.

# Evidence

Measured 2026-08-07 against `~/code` at `ecf5f9518f` and the live roster. A quarantined document made a wider version of this claim on 2026-07-30; the wider claim is false today and the mechanism is not, so this is filed at the width it holds.

`listRcEnabledSeats` at `packages/agents/supervisor/src/rc-degraded-seats.ts:106` iterates `await deps.listPersonaSlugs()` and, for each, calls `deps.resolveAgent(name)` — `getAgentByName(name)` on the bare slug. A row whose `name` is not a bare persona slug is never looked up, so it is outside the set before `isRcEnabled` or the running test is reached. It is wired: `wake-watcher-daemon.ts:375` calls `runRcDegradedTick` on every tick.

`ops seat list` returns 62 live seats. Nine are persona-family: `amy`, `ryn`, `vera`, `dalla`, `athena`, `alan` bare, and `abby-all-about-alan-recorder`, `amy-monarch`, `amy-handler` compound. The three compound ones are invisible to the enumeration. Two of them carry a persona who is also running bare, so the detector reports on `amy` while seeing neither `amy-monarch` nor `amy-handler`.

NOT true today, and worth separating: the population is not empty. Six bare seats are live, so the detector's green is a reading over a real corpus rather than one produced by seeing nothing. The remaining 53 seats are `claude-*` workers, which the code's own comment excludes deliberately — "RC off — never alert (worker/gameplay seat)" — so their absence is by design and not this.

Not established: whether a compound persona seat has RC enabled, or how often one runs without a bare sibling. I read the enumeration and the roster, not RC state per seat.
