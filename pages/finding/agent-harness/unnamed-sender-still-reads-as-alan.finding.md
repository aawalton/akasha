---
id: f2da53b8-3fe7-534e-bbc8-d418fdee17a8
page-type-slug: finding
title: "Unnamed sender still reads as Alan"
domain-slug: domain/agent-harness
---

# Claim

`ops seat send` still reads an unnamed sender row as Alan reaching out, stamping a persona's `lastMessagedAt` and flipping the wallpaper-follow, and 38% of live agent rows carry no name. The sibling predicate with the same job was repaired to read the sender off the message envelope instead; this site kept the row-name test deliberately, on a premise its own comment records as measurably false.

# Evidence

Read 2026-08-07 against `~/code` at `ecf5f9518f`, while ingesting a quarantined findings cluster that recorded a 12.7% version of this.

`packages/agents/cli/src/agent/send.ts:388` is `const senderIsUnnamed = senderName === null || senderName.trim() === ""`, and the branch under it calls `stampAndFollowByAgentId(targetAgentId)`. The comment above states the premise and its own falsity, at `:384-387`: "The premise the test rests on — that only an interactive seat is unnamed — is measurably false: unnamed HEADLESS rows exist in quantity, and each one falsely reads as Alan reaching out here."

The population has grown, not shrunk. `select count(*) total, count(*) filter (where attributes->>'name' is null or attributes->>'name'='') from public.pages where page_type_slug='agent' and deleted_at is null` returns **282 of 748**, or 37.7%, against the 12.7% recorded.

THE REPAIR EXISTS AT THE SIBLING SITE, WHICH IS WHAT MAKES THIS WORTH RE-FILING. `isAlanAuthoredPrompt` (`packages/agents/shared/prompt-shape.ts:185-192`) gates the same `lastMessagedAt` stamp on the `UserPromptSubmit` path, and it no longer reads a row at all: it takes a bare keyboard prompt, or a channel envelope whose `sender === "system"` with a null `sender_agent_id`. `send.ts:166` records the change — "The predicate this replaced read an unnamed row as Alan." So one of two sites keyed on the same question moved to the message envelope and the other did not, and the envelope is available on the send path too.

One likely source of the unnamed rows is documented a repo away: `decide-spawn-name.ts` notes that an identity spelling an undeclared name "is refused only AFTER `createAgentRow`, stranding a nameless row."

Not measured, and the same bound the original set: how many stamps were actually false. The sender's name at send time is not recoverable from its row now, so only the size of the population able to produce one is establishable.
