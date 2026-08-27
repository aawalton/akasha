---
id: 7ce14f72-e58c-586a-8d36-2856928740ac
slug: spawn-states-no-principal
page-type-slug: finding
title: "Spawn states no principal"
domain-slug: domain/seat-principal
---

# Claim

No seat spawned since 2026-08-12 15:00 records a principal, in its seat store or on its
row, though every one of them is an agent's.

# Evidence

The headless launch core stated `principal: agent` on every relaunch until commit
b7718561e1 in the code repository (2026-08-12 14:58), which removed it because a relaunch
cannot tell a spawn from a revive, and the restatement was renaming Alan's seats on the way
to headless. The note left in `packages/agents/cli/src/agent/state-identity.ts` says the two
honest fronts each state a principal at their own front. Only one of them does.
`tools/aw/init/state-seat-attributes.ts` states `alan`. `packages/agents/cli/src/agent/spawn.ts`
spells `agent` into the name composition alone, at the `composeSeatName` call that decides
which form the name takes; it reaches no seat call, so nothing writes it.

Measured on this host, 2026-08-12: agent 019ff6a7-a76f-7181-8b8b-23f402f99597, spawned after
that commit, holds the keys project, mode, initiative, name, pushed, persona, domain, role
and task in `~/.instruction-seats`, and no principal; `ops seat whoami` answers
`principal=null` for the same row. The two spawned seats before it read the same, and each
one's `pushed` string ends in an empty principal field.

Nothing spells a wrong name over it: the composition answers silence with the agent form,
which is the form these seats would take anyway. What is lost is the record — an absent
principal reads as a starter that never said, and these had one.
