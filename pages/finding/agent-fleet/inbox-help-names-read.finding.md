---
id: 70867830-bc76-5c68-9a32-ae2fef9cb0ce
slug: inbox-help-names-read
page-type-slug: finding
title: "Inbox help names read"
domain-slug: domain/agent-fleet
---

# Claim

`ops seat inbox` tells its reader it writes `read`, and writes `claimed`.

Its help says "mark them read" and "returns pending (unread) messages and marks them read"; the comment says "which surfaced ids transition pending→read"; the identifier is `markReadIds`. The call is `claimInboundMessages`, which writes `CLAIMED_MESSAGE_STATUS`. This is the vocabulary from before the two fates were split, restated to whoever reads the verb.

# Evidence

Read on 2026-08-07 against `~/code` at whatever commit that checkout stood on; I did not record the sha.

What I read. `packages/agents/cli/src/agent/inbox.ts` in full — the `help` object and `agentsInboxCommand`. `packages/agents/shared/db-messages-claim.ts`, where `claimInboundMessages` is `update({ status: CLAIMED_MESSAGE_STATUS }).in("id", ids).eq("status", PENDING_MESSAGE_STATUS)`. `packages/agents/shared/message-status.ts` in full, for what each value is declared to witness. `packages/agents/supervisor/src/supervisor-claimed-redelivery.ts`, whose header already states the consequence — "The pull path (`claimInboundMessages`) also writes `claimed` and writes no witness" — which is how I know the code side of the split is understood and only the CLI's prose is behind.

I grepped for `READ_MESSAGE_STATUS` across `packages/`, excluding `dist/` and tests: the only write is `packages/agents/shared/supabase-realtime-claim.ts:123`. So no pull path writes `read`, and nothing in `inbox.ts` could.

What I did not measure. I did not read `inbox-core.ts`, so `planInboxDrain`'s own naming and any prose inside it are unexamined beyond the identifier it returns. I did not check whether any caller or test asserts on the help text, so I cannot say what a repair would break. I did not look for the same stale vocabulary elsewhere in the CLI — `agent tail`, `agent records` and the MCP surface may carry it too, and I only looked at `inbox`. I took no reading of how often an agent actually acts on the wrong value; the claim is about what the surface says, not about a measured consequence.

I did not repair it. This was found while ingesting `dirty/knowledge/message-delivery.md`, whose `## The pull path claims and is never witnessed` states the true behaviour correctly; that document is quarantined and queued for removal, so the observation would go with the sweep if it were left there.
