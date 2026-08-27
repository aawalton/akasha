---
id: 51966d5f-5ed1-5190-943d-1f680c984e5d
page-type-slug: finding
title: "Turn end hook timeouts inverted"
domain-slug: domain/agent-harness
---

# Claim

Both turn-end Stop hooks declare a timeout smaller than the one inside them, so the caller's bound fires before the bound it is supposed to contain, and the guard silently does not apply.

# Evidence

`settings/agents.json` gives `block-headless-halt.sh` a `timeout` of 10 and `block-interactive-stall.sh` a `timeout` of 30. Both source `tools/lib/turn-end-decide-call.sh`, which runs `timeout 45 bun ops instructions turn-end-decide`. Inside that, `judgeRead` waits 8s on the reading and `outboundRead` and `heldRead` each wait up to 30s on their `ops` subprocess.

So the 45s bound written to keep a turn end from hanging can never be the one that fires: the hook is killed at 10 or 30 first. `tools/turn-end-reading.ts --help` states the ordering this violates — "A caller's own timeout must sit OUTSIDE this one, or it fires first and the abort keeping the answer bounded never runs."

What a hook timeout produces is not a refusal. The hook is killed, no decision is recorded, and the turn end proceeds — the same observable result as a seat the guard cleared. Nothing distinguishes a turn end that was judged legal from one where the judge was cut off, which is why this is not visible in the decision log.

Measured today rather than reasoned about: 112 turn-end decisions are recorded and none carries a timeout reason, so nothing says this has yet bitten. The inversion is structural and stands on both arms.

The 30 on the interactive arm is new, from the commit registering that hook. The 10 on the headless arm predates it. Neither number was chosen against the 45.
