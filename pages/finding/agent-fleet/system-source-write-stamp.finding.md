---
id: c26ae9d2-42f1-55fd-bdac-a69d883a37e4
slug: system-source-write-stamp
page-type-slug: finding
title: "System source write stamp"
domain-slug: domain/agent-fleet
---

# Claim

`packages/agents/shared/wake-source-tags.ts` closes `SYSTEM_SOURCE`'s docblock with "It is exported for the READ side alone", and a write site imports that export and stamps it: `packages/agents/devops-monitor/src/messenger.ts` passes `SYSTEM_SOURCE` as `insertInboundMessage`'s `source` argument on its derived-owner lane. A reader taking the sentence at its word does not go looking for stamp sites.

# Evidence

Read at `origin/main` `13135651993c19af09ce41b6295264191071d3c1`.

`wake-source-tags.ts:193-196` — the docblock's last sentence, "It is exported for the READ side alone, as the first member of {@link SYSTEM_SOURCE_FAMILY}.", then `export const SYSTEM_SOURCE = "system"`.

`devops-monitor/src/messenger.ts:32` imports `SYSTEM_SOURCE`. Line 103, inside `sendEnvelope` on the `derivedOwner` branch, is `return await insertInboundMessage(targetAgentId, userId, content, null, SYSTEM_SOURCE)`, whose fifth parameter is `source`. Line 83 of that same file says it in its own words — "the owner lane stamps bare {@link SYSTEM_SOURCE} and claims no warrant" — so the two files disagree while importing one another.

The docblock also disagrees with itself at lines 183-186, naming senders that "keep stamping it deliberately": supervisor progress and completion notices, attention-question nudges, stale-project sweeps. Those spell the bare literal rather than importing the constant. `grep -rn "SYSTEM_SOURCE\b" --include=*.ts packages/`, less `dist/` and the tags module itself, returns exactly one production stamp — the messenger line above — every other hit being a test, the checks scanner, or a read-side filter. `main-pipeline-alert` was moved off the bare value by #17879, recorded at lines 188-190.

No gate reaches this. `packages/infra/checks/src/checks/check-no-hardcoded-message-source.ts:17-24` declares two rules: a literal in a `source` predicate, and a `system:*` tag minted outside the tags module. Neither reaches a bare `"system"` in an insert-argument position, and `packages/agents/shared/db-messages-write.ts:169` stands as one, with CI green.

Filed while ingesting `dirty/questions/code-repo-source-comment-reach.md`, whose fourth entry recorded this and was cut as not being instruction. That document is queued for removal, so the observation would have gone with the sweep.
