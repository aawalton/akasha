---
id: 4ec57a00-b3e9-586f-9783-ce49cd9756c7
slug: comment-rule-unheld
page-type-slug: finding
title: "Comment rule unheld"
domain-slug: domain/code-quality
---

# Claim

The Code Comments rule is contradicted by every file in the repo that declares it. `domains/code-quality.md` binds a comment only where a tool reads it as a field, and it governs every `.ts` file in both repos through `domains/file-kinds/typescript.md`. Of the 105 files under `tools/` and `tools/lib/` in the instructions repo, 105 open with a prose block comment. Those headers are also the primary evidence a seat auditing the code has to work from.

# Evidence

Measured on 2026-08-09 in `~/instructions`: 105 files match `tools/*.ts` and `tools/lib/*.ts`, and 105 of them open with a `/**` block within their first three lines. `bun tools/governs.ts --file-path tools/seat.ts` names both `domains/code-quality.md` and `domains/file-kinds/typescript.md`, so the rule reaches them.

The headers are not decoration. Every abstraction landed under the defined-foundations initiative today was found by reading one: `reset-times.ts` names its three separate zone-domains and warns against reusing one for another, `wake-day.ts` records that Alan ruled for a sleep-anchored day, `faucet-engine.ts` states the one-source-two-projections split, `totals.ts` states the high-water rule. None of that is a field any tool parses, and none of it stands anywhere else.

Raised on 2026-08-09 by the seat on #18240, which met the rule while writing TypeScript, followed it for its own code, left the neighbouring files alone, and reported that the strict reading and the surrounding corpus disagree.

Not measured: the code repo, where the same rule applies and the population is far larger. Not judged: whether the rule is wrong, whether it means something narrower than its strict reading, or whether the corpus is in breach — that is code-quality's to settle. Not read: whatever discussion produced the rule.
