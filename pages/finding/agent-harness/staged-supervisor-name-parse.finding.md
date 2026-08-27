---
id: 326c901d-5203-5a0f-8a8f-ea0b20f85b13
slug: staged-supervisor-name-parse
page-type-slug: finding
title: "Staged supervisor name parse"
domain-slug: domain/agent-harness
---

# Claim

The supervisor tree staged in the instructions repo still derives a seat's bound project by parsing its name, so porting the supervisor process file would put the retired parse back in front of the fleet.

# Evidence

`parseProjectSeqFromName` matched 0 of the 14 seats live on 2026-08-14 and 0 of the 379 named agent rows the table held. #19053 moved every live reader in the code repository onto the `projectSeq` the seat states, and moved the one live reader in this repo, `tools/commands/seat/in-flight.ts`.

Four sites in the staged supervisor tree still parse the name:

- `tools/lib/supervisor-idle-observe.ts:56` — `selectInFlightDispatch`, the same function whose code-repo twin returned the empty set for every parent whatever was live.
- `tools/lib/supervisor-child-reconcile.ts:91`
- `tools/lib/supervisor-iteration-outcome-db.ts:67` — holds an agent row already, so it can read the row's own slot.
- `tools/lib/spawn-state.ts:9` — `SPAWN_STATE_SHAPE` declares no `projectSeq`, which the first of these needs.

These are not live: on 2026-08-14 the process table held 28 supervisors running `packages/agents/supervisor/src/supervisor.ts` from the code repository and none running `tools/lib/supervisor.ts`. They go live on the commit that ports the process file.

The `seat-derivation-coverage` wedge #19053 added does not cover this. It measures the `projectSeq` slot on live agent rows, and these four read spawn-state files and row names, so a regression here would be silent in the same way the original was.
