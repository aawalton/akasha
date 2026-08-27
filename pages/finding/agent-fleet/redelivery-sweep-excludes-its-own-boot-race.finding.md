---
id: 1b470db4-505b-5cae-bf3a-85b36aedb2e1
slug: redelivery-sweep-excludes-its-own-boot-race
page-type-slug: finding
title: "Redelivery sweep excludes its own boot race"
domain-slug: domain/agent-fleet
---

# Claim

The claimed-message redelivery sweep cannot recover, within the lifetime of the process that
lost it, the loss class its own docblock names as the one that matters. The boot-race loss is
claimed AFTER the resuming process starts, and the sweep's population is claims written
strictly BEFORE that instant. Resume N's boot-race row is invisible to resume N's own sweep
and waits for resume N+1; a seat revived once and then left running has no N+1.

# Evidence

Read on 2026-08-07 against `~/code` at `ecf5f9518f`.

**The population is claims strictly before this spawn.** `supervisor-interactive.ts:245`
sets `processStartedAtMs = Date.now()` and passes it to `reconcileClaimedRedelivery`, whose
reader is `readClaimedBefore`. That function
(`packages/agents/shared/db-messages-claim.ts:68`) filters `.lt("updated_at", before)`.
`decideClaimedRedelivery` (`supervisor/src/supervisor-claimed-redelivery.ts`) applies the
same boundary again, skipping every `claimedAtMs >= processStartedAtMs` as `in-flight`.

**The loss it exists for falls on the other side of it.** That module's own docblock says
the losses that matter "were never enqueued AT ALL — a notification emitted before Claude's
MCP client finished initializing is discarded". That discard happens once the MCP process is
up enough to win the claim, which is after `processStartedAtMs`. The two statements sit in
one file and do not meet.

**The holdoff does not close it.** The call site passes `waitForRedeliveryHoldoff` and its
comment says the sweep is "Held off past the booting MCP's backlog drain, which is the
consumer that loses these rows". That delays WHEN the sweep runs, not WHAT it reads, which
stays `< processStartedAtMs`.

**Not measured.** I did not reproduce a stranded row against the database, did not re-derive
the median 1.26 s claim-after-spawn figure (it comes from a now-quarantined observation doc I
have not checked), and did not establish how often a seat resumes exactly once — which is
what sets how much mail this strands. The claim rests on the three readings, which hold
whatever that distribution is.

**Distinct from `agent-fleet/claimed-rows-unswept.md`.** That records the seat which never
resumes. This is the seat that does, and is still not reached.
