---
id: f655e9de-4f2d-5c41-a8fa-f1754e81ca33
page-type-slug: finding
title: "Wake guard bound overstated"
domain-slug: domain/agent-fleet
---

# Claim

`packages/agents/routing-core/src/wake-armed-seats.ts` tells its reader that `wakeAgent` is an unguarded path — "it binds only a caller that asks: `wakeAgent` is reachable directly, so a writer that never comes here is not held by anything here, and leaves no trace of having skipped it." `wakeAgent` cannot be called without a warrant and refuses by throwing, so the hole a reader is sent looking for is closed.

# Evidence

Read `wake-armed-seats.ts` and `packages/agents/shared/db-messages-write.ts` whole against `~/code` on 2026-08-07; I did not record the sha.

The sentence closes `wake-armed-seats.ts`'s docblock header "WHAT ONE FUNCTION DOES NOT BUY": "And it binds only a caller that asks: `wakeAgent` is reachable directly, so a writer that never comes here is not held by anything here, and leaves no trace of having skipped it."

`db-messages-write.ts:277-282` types `wakeAgent`'s parameter as `InboundRow & { readonly warrant: WakeWarrant; readonly client?: MessageClient }`, so a caller omitting the warrant does not typecheck. It delegates to `wakeAgentObserved`, which at line 285 calls `enforceWarrant("wakeAgent", input, input.warrant)`. `enforceWarrant` at lines 201-210 runs `decideEmission` and throws on `!decision.allow`. `insertInboundMessage` (235) and `insertInboundMessageIfReachable` (256) reach it with a `null` warrant, so an announce cannot be spelled as a wake either.

The sentence is defensible on "not held by anything HERE" — a direct caller does bypass `decideSeatWakeByName`. What has gone false is "leaves no trace of having skipped it": the write is refused at the boundary. The direction matters — a reader is told a hole is open where one is closed, which invites building a second guard for it.

The residual gap here is a different one and is already recorded: `pages/finding/agent-fleet/ratification-arming-unseen.finding.md`.

Found while ingesting `dirty/questions/wake-watcher-doctrine.md`, whose first entry restates this sentence as its main claim and was cut for it.
