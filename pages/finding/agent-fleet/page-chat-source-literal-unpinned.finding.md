---
id: f7a5e016-138d-59d4-8d5e-2b031a0d0476
slug: page-chat-source-literal-unpinned
page-type-slug: finding
title: "Page chat source literal unpinned"
domain-slug: domain/agent-fleet
---

# Claim

The persona page's send route spells its `messages.source` value as its own literal instead of importing the exported constant, and the wired gate declares this family out of scope.

`api.persona.message.ts` defines `const MESSAGE_SOURCE = "page-chat"`. The value it duplicates is `PAGE_CHAT_SOURCE` at `standing-persona-spec.ts:45`, the `senderMatch` of every persona's page-chat wake rule. The route's own docblock says changing the string leaves the message delivered and the persona never woken.

# Evidence

Read in `~/code` on 2026-08-08 while ingesting `dirty/code/packages-alanwalton-personas-docs-page-comms.md`; I did not record the sha.

Two spellings. `packages/alanwalton/web/app/routes/api.persona.message.ts` imports `{ getAgent, resolveAgentTarget, wakeAgent }` from `@agents/shared/db` and nothing from `@agents/routing-core`. It declares `const MESSAGE_SOURCE = "page-chat"` and sends `wakeAgent({ …, source: MESSAGE_SOURCE, warrant: { kind: "human-awaiting" } })`. The constant it shadows is `export const PAGE_CHAT_SOURCE = "page-chat"` at `packages/agents/routing-core/src/standing-persona-spec.ts:45`, used at `:92` as `senderMatch: PAGE_CHAT_SOURCE` in every standing persona's `wakeSources`. `rg -n PAGE_CHAT_SOURCE` over `packages/` lists routing-core, `packages/agents/shared/wake-warrant.ts` at 32, 116 and 130, and three test files. The web route is not among them.

Why the wired gate misses it. `no-hardcoded-message-source` stands in `ops enforcement list`, registered from `packages/infra/checks/src/lib/scanner-registry.ts`. Its scanner, `packages/infra/checks/src/lib/ts-messages-source-literals.ts`, scopes rule 1 to a `source` predicate position, rule 2 to minting a `system:` tag outside the tags module, and rule 3 to unfireable `senderMatch` values — and rule 3's own paragraph excludes this family by name: "`sms:`, `agent:`, `page-chat` and the dynamically-built families (`project-deploy:<seq>`, …) are out."

What this adds. `pages/finding/agent-fleet/ungated-system-source-literal.finding.md` records the same shape at another site, `source: "system"` inline at `db-messages-write.ts:169`, and says in its own words that it did not look for other sites. This is a second site, in another package and another source family, where the exported constant already exists and the scanner's exclusion is written down rather than incidental.

Not measured. I did not run the check against the file, only read its rules. I did not search for other `page-chat` literals beyond the three tests, and I made no repair.
