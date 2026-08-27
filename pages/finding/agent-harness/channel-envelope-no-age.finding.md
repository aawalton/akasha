---
id: 75f40260-ff51-5353-b589-94930480c212
slug: channel-envelope-no-age
page-type-slug: finding
title: "Channel envelope no age"
domain-slug: domain/agent-harness
---

# Claim

The injected `<channel>` message envelope carries no age field, so a recipient reading a `<channel>` block cannot tell a payload sent seconds ago from one that sat pending for days while its seat was dead, even though age is already computed and rendered for the same underlying data by both the record digest and the inbox pull, through two different renderings of the same quantity.

# Evidence

Project #17838, domain `agent-harness`, status someday_maybe, live-on deploy. Filed by `ryn` for `athena`.

Objectives (all unchecked):
1. Injected channel envelope carries the message's age, so a recipient can tell a payload sent seconds ago from one pending for days while its seat was dead.
2. Envelope parser and byte-exact fixtures move with it — `prompt-shape.ts:114-131`, `channel-delivery.ts:62`, fixture at `prompt-shape.unit.test.ts:17`.
3. All three rails render age the same way, not a third spelling of what the record digest and inbox pull already do.
4. Nothing expires, no message drops — drain still filters on target, status, deletion alone. Reporting age is the change; deciding one is not in scope.

Notes: DO NOT DISPATCH until CI cutover finishes; Alan set that fence 2026-08-04, covers every change reaching `~/code`.

Sites, measured 2026-08-04, all under `packages/agents/`: envelope produced at `messages/tools/agent-tools.ts:28-40` from the four-field `DeliveredMessage` at `:21-26` (never reads `created_at`); age already rendered at `shared/agent-record-event.ts:200-202` (`previewAge` at `:188-192`) and `cli/src/agent/inbox-core.ts:47-52`; drain has no age predicate at `shared/supabase-realtime-messages.ts:177-186`; `shared/db-messages-bounce.ts:109+` is the only remover of a pending row (keyed on recipient retiring).

Before building: wrapper text isn't formatted in `~/code`; Claude Code emits it from the MCP notification, so the repo parses but doesn't own it. `shared/prompt-shape.ts:30-34` omits `user_id` deliberately; settle if the missing timestamp is too.

`supervisor/src/supervisor-claimed-redelivery.ts:20-25`: an age threshold was considered and rejected — a busy seat holds a message `claimed` a whole turn; a threshold would redeliver in-flight mail or miss real losses. This row only reports age, decides nothing.

Not measured: why the delivery was delayed — queue reads clean, zero pending, no exit record for the sending seat.
