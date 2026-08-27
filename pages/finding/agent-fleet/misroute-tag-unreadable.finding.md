---
id: 54586b3f-e26c-5908-a7dd-79db6908cb4b
slug: misroute-tag-unreadable
page-type-slug: finding
title: "Misroute tag unreadable"
domain-slug: domain/agent-fleet
---

# Claim

The inbound-message misroute guard logs a `deliveryPath` tag — `realtime-insert` or `backlog-drain` — chosen to discriminate between the two open root-cause hypotheses for a cross-wire, and what each tag implicates is recorded in no file, no log line and no command output. The next misroute therefore prints the discriminator and nothing that reads it, on a root cause that is still open.

# Evidence

Measured 2026-08-07 against `~/code` at `47a2a573e45a469061c65aaa2db522a65fa473d4`.

`packages/agents/shared/supabase-realtime-messages.ts:129-148` — `deliverGuardedMessage` takes `deliveryPath: "realtime-insert" | "backlog-drain"` and, on a mismatch from `classifyInboundDelivery`, logs `[realtime] <channel>: MISROUTE REFUSED — message <id> (via <deliveryPath>) addressed to target_agent_id=<intended> but delivered to subscriber agent=<actual>; refusing delivery, leaving row pending (never consumed)`.

The tag is printed; its meaning is not. That module's docblock at lines 110-127 explains the refusal and names project #12983, and says nothing about what the two paths distinguish. `packages/agents/shared/supabase-realtime-helpers.ts:333-352` likewise.

The mapping existed in exactly one place, `packages/agents/messages/CLAUDE.md`, quarantined as `dirty/code/packages-agents-messages-claude.md` and cut today: "a `backlog-drain` misroute implicates DB-consistency/replica timing (the query returned a row whose `target_agent_id` ≠ the queried value), while a `realtime-insert` misroute implicates Realtime filter-binding staleness (project #13101)."

`rg -n "13101"` returns nothing under `packages/agents/` or `packages/shared/`, nothing under `~/instructions/domains/` or `~/instructions/tools/`, and nothing under `~/memory`. I ran it narrowly: bare over `~/code` the pattern matches vendored HTML fixtures and Lua sourcemaps in the thousands.

The same document called the root cause "still open" and the guard's job "making it self-reporting for the next occurrence" — which is what makes the unreadable tag cost something rather than merely being untidy.

NOT measured: whether any misroute has occurred since the guard landed, which needs the log history rather than the source.

Not a duplicate: `~/memory/findings` has four files naming a misroute and none is about this tag.
