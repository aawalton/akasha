---
id: cf5abc3c-4561-5235-9c45-30da48d0ed6d
page-type-slug: finding
title: "Nothing can send Alan a message"
domain-slug: domain/alan-harness-agents
---

# Claim

Nothing can send Alan a message: `ops seat send --person alan` refuses at recipient resolution, because no seat holds the name `alan` that the person-addressing path resolves to.

# Evidence

`ops seat send --person alan --content "..."` exits 2 with `[ops] No seat found matching 'alan'`.

The path is `addressPerson(personSlug, ALAN_AGENT_NAME)` in `tools/commands/seat/send.ts`, where `ALAN_AGENT_NAME` is `"alan"` (`packages/agents/shared/alan-identity.ts`). Recipient resolution then calls `resolveSeatTargetCli`, which refuses because `~/repos/memory/seats/` holds no `alan.md`. The seats standing are aine, alan-email-archivist-review-instructions, amy-alan-handler, amy, astra, athena, dalla, domain-archivist-review-documents, nimue, ryn, thea.

This refusal sits upstream of the message store, so it predates the move from rows to files: the same call refused before that change for the same reason. The cluster worker that would consume such a message, `packages/alanwalton/apns-push-notifier/src/alan-message-consume.ts`, polls `getAgentInboundMessages(alanAgentId)` against `public.messages`, which nothing writes now.

Alan's other channels are unaffected and were checked: `ops ask-alan` pushes through `notify()` rather than the message store, and `amy-alan-handler` is a live seat whose directory receives files normally.

Not established here: whether the `alan` inbox is meant to exist as a seat, or whether the person-addressing path should resolve to `amy-alan-handler` instead. Either answer makes this one line of resolution rather than a rebuild.
