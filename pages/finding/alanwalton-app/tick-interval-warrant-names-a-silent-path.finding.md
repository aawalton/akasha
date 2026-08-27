---
id: 823b070a-b17c-52bc-91c1-c8bcfc558296
page-type-slug: finding
title: "Tick interval warrant names a silent path"
domain-slug: domain/alanwalton-app
---

# Claim

The email watcher's tick interval is held at 60 seconds by a docblock whose whole warrant is that `wakeAgentChannels` wakes Amy for triage and nothing else does. `wakeAgentChannels` wakes nobody, by its own docblock and by the function it calls, and the function that does wake for triage is `surfaceToAmy`. The interval's stated reason names the wrong path.

# Evidence

In `packages/alanwalton/email/watcher/src/gmail-new-mail.worker.ts`, `const TICK_INTERVAL_MS = 60_000` carries a docblock opening "60s, HELD DELIBERATELY — this worker is exempt from the ladder's hourly default and the exemption is Alan's ruling, not a cost argument." Its argument: "What forces it is human: `wakeAgentChannels` is the delivery mechanism for Alan's email triage, and nothing else wakes Amy to perform it. Alan ruled to keep that wake (2026-07-25)."

`wakeAgentChannels` does not wake. In `src/surface.ts` its per-handle body ends `await insertInboundMessage(resolved.id, agent.user_id, content, null, EMAIL_CHANNEL_SOURCE)` — an insert with no warrant. Its own docblock states the consequence: a persona is revived only if her row declares a `wakeSources` rule matching that tag, "and none does today — so channel mail currently lands in the mailbox and is read at her next boot." `EMAIL_CHANNEL_SOURCE` is a member of the `UNPAIRED_SOURCES` array in `packages/agents/shared/wake-source-tags.ts`, which is executable rather than commentary.

The function that does wake is `surfaceToAmy`, in the same file: `await wakeAgent({ …, source: EMAIL_SURFACE_SOURCE, warrant: { kind: "ratified-interrupt", recipientHandle: EMAIL_SURFACE_HANDLE } })`, and `EMAIL_SURFACE_SOURCE` is paired with `amy-handler` in `SOURCE_RECIPIENTS`. The triage wake is real; it is not the function the warrant names.

The docblock offers itself as the record of why the worker is exempt from the hourly default, so a reader weighing a change to the interval reads it as the standing reason. Whether the exemption holds is a question about `surfaceToAmy`, which it never mentions.

Read at `~/code` on 2026-08-08 while ingesting `dirty/code/packages-alanwalton-email-watcher-claude.md`.
