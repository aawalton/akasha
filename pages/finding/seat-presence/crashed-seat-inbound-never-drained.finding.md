---
id: 33e8ff0f-1ebc-532d-8abe-1f4260dca602
page-type-slug: finding
title: "Crashed seat inbound never drained"
domain-slug: page-property-definition/seat-presence
---

# Claim

A message sent to a crashed wake-armed seat is delivered and then never read, because the two sites involved hold opposite beliefs about what the wake-watcher does with a `stopped` row.

# Evidence

`packages/agents/shared/decide-dead-recipient-routing.ts` states, at the `recipientWakesOnThisMessage` field, that a wake-armed seat which has crashed goes `running` -> `stopped` and never `dormant`, and that the watcher "revives it on this very inbound", so the send must deliver rather than refuse.

`packages/agents/supervisor/src/wake-watcher-tick.ts` takes the stale-live leg for exactly that row, and both branches of it return without reviving, each saying the inbound stays queued. The refusal is deliberate and cites never-auto-restart: reviving a crashed seat hides the failure that should be root-caused.

So the send is admitted on a promise the watcher declines to keep, and the message sits in an inbox nothing drains. Both files were read at commit 3a330839 of the instructions repo; neither claim is inferred from the other's wording.

Which of the two should change is a code decision and not this finding's to make. What is certain is that they cannot both stand.
