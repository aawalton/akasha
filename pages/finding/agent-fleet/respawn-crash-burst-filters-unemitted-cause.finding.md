---
id: 0c3776b1-d072-54f9-91ad-9e63d3b43cb1
page-type-slug: finding
title: "Respawn crash burst filters unemitted cause"
domain-slug: domain/agent-fleet
---

# Claim

The `agent.respawned` module's header describes a crash revive the wake-watcher explicitly refuses to perform, and the crash-burst detection it exists for filters on a cause nothing ever emits.

# Evidence

Read at `~/code` on 2026-08-07 at `383bf60d`, while emptying a quarantined question document, now queued for removal, that raised it.

`supervisor/src/agent-respawned-event.ts` exists (#14022) to make a correlated respawn burst detectable — "many seats respawned within a short window → systemic cause". Its header states two things about the tree; both are false.

First, `:4-6`: "The wake-watcher revives an on-demand agent whose process was gone — either deliberately parked (`dormant`...) or crashed and provably-dead (`stale-live`)." The watcher refuses the second case by design. `wake-watcher-tick.ts:398-421` takes that arm and says so at length: "Per never-auto-restart ... we do NOT respawn it — reflexively reviving a crashed seat hides the failure signal that should be root-caused. Record the death and stop ... (No `agent.respawned` emit — nothing was respawned.)" It calls `recordStaleLiveDeath` and returns.

Second, `:35-37`: "A crash-burst rung filters `cause = "stale-live"`". `RespawnCauseZ = z.enum(["dormant", "stale-live"])` at `:38`, and the only `emitRespawned` call in the tree is `wake-watcher-tick.ts:426`, on the dormant leg, passing the literal `"dormant"`. So `"stale-live"` is a declared cause nothing produces, and the crash-burst filter ranges over an empty set — the detection this module was built for cannot fire.

What makes it more than stale prose is where the disagreement sits. `decide-wake-match.ts:104` bills itself as "THE answer to 'would this inbound revive this seat', and the only one", written (`:12`) to end two bodies of code answering that apart. It returns a revive verdict for a provably-dead process on a non-dormant row, and its single caller discards exactly that verdict. `agent send`'s guard reaches the same decider, so the function that exists to stop two surfaces disagreeing is where they disagree.

Two repairs are available and this observation picks neither: narrow the decider to what the fleet does, or make the tick honour what it asks.
