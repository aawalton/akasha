---
id: 0a4f202c-af4a-5972-a1db-88324b8533f7
page-type-slug: finding
title: "Classifier docblock names wrong write"
domain-slug: domain/agent-fleet
---

# Claim

A live docblock in the persona-chat classifier names a write path the code does not take, and the module that performs the write names a different one.

`packages/agents/shared/persona-chat-classify.ts:18-21` says the effectful shell is `lib-watch.ts`'s `doUpload`, writing the result "through `patchPageById`". The write is `upsertPage`, in `persona-chat-mirror.ts`, whose own docblock says so. Two docblocks in one package disagree about one call.

# Evidence

Read in `~/code` on 2026-08-08 while emptying `dirty/code/packages-alanwalton-personas-docs-page-comms.md`; I did not record the sha.

The claim. `packages/agents/shared/persona-chat-classify.ts:18-21`: "the effectful shell (`lib-watch.ts` `doUpload`) feeds it the freshly-synced transcript and writes the result through `patchPageById`. Nothing reads the window back as persona state, so a lost window rebuilds on the next flush (see `page-comms.md`)."

The code. The write is not in `lib-watch.ts` and is not `patchPageById`. `persona-chat-mirror.ts` imports `{ upsertPage } from "@shared/pages-access"` and its projector runs `await upsertPage(sb, { pageTypeSlug: PERSONA_CHAT_PAGE_TYPE_SLUG, where: [{ key: "persona", includes: personaId }], set: { persona: [personaId], window, userId: USER_ID }, select: ["id"] })`. `lib-watch.ts` calls the mirror rather than writing: `:34` imports `resolvePersonaChatMirror`, `:223` resolves it once, `:177` is the post-sync slot. `patchPageById` is real at `packages/shared/pages/access/src/patch.ts:150`, so the name resolves.

The mirror's own docblock is right: it says the window is "one blob rewritten per flush through `upsertPage` — which routes to `page_upsert`". So the two prose surfaces in one package disagree, and only reading the executable separates them.

Why it is worth recording. The quarantined document I was emptying said `patchPageById` too, so cross-checking document against docblock would have returned AGREEMENT and settled the block as accurate — the one outcome nothing investigates. They rot in the same direction and the call site is the only witness.

What already stands. `pages/finding/code-repo/bare-filename-citations-unswept.finding.md` names `page-comms` among seventeen bare-filename citations resolving nowhere, so the dangling pointer in the same sentence is recorded. The wrong call and the wrong module are not.

Not measured. I did not check other docblocks in `packages/agents/shared/` for the same drift, so this is one site and not a population. I did not repair it.
