---
id: 99ec6251-f48d-4277-bd2a-eb821982546e
page-type-slug: finding
title: "The 369 unjudged lines are nine keys"
slug: the-369-unjudged-lines-are-nine-keys
domain-slug: domain/pages-system-answer
---

# Claim

The `369 key(s) nothing states a type for` that `pages-hold-properties` reported is 369 page-key lines over nine keys on 287 pages, not 369 keys. Six of the nine are attachment properties, whose values sit beside the page, so a frontmatter reader cannot judge them by design: 256 lines. Two are one missing rule, `template`: 111 lines. One is one property definition stating `pattern` with no `backstop`: 2 lines. Nothing in the list is a misspelling or a key its type no longer declares; those refuse instead.

# Evidence

Measured 2026-08-28 by a delegate of seat astra, over 59,225 claimed akasha pages, by the audit's own loop.

The nine, with counts and page types.

BY DESIGN, 256 lines, six keys, all attachments: `code` 63, on `check`, `command`, `agent-hook`, `inference-hook`, `graph-edge-producer`, `graph-node-producer`; `declaration` 45, on `workflow-template`; `keep-contract` 41, `portrait` 41 and `purpose` 41, all on `persona`; `pgn` 25, on `chess-game`. `judgeFrontmatter` writes these at `page/property/judge.ts:160-163` because the value is in a sidecar and it reads frontmatter. Nothing is missing.

ONE MISSING RULE, 111 lines, two keys: `named-for` 109, on `page-type`; `default` 2, on `page-property-definition`, reaching the same type through `type: "{type}"` at `pages/page-property-definition/page-property-definition-default.page-property-definition.md:7`. Both answer "`template` is a type this states no rule for". `template` stands as a declared primitive at `pages/page-property-type/template.page-property-type.md:5-6`, and `RULES` at `page/property/value.ts:178` holds no entry for it, so the gap is in code, not data. `pages/page-type/page-property-type.page-type.md:26` says only primitives are named in code. Already held by `pages/finding/page-property-definition/template-is-a-type-nothing-rules.finding.md`.

ONE MALFORMED DECLARATION, 2 lines, one key: `subagent-type` on `subagent-kind`. `pages/page-property-definition/subagent-kind-subagent-type.page-property-definition.md:8` states `pattern` and no `backstop`; `page/document/template.ts:40-44` refuses that pair.

POSITIVE CONTROL for the two zeros. On `pages/subagent-kind/subagent-kind-explore.subagent-kind.md`, `judgeFrontmatter` untouched gives 1 unjudged and 0 refusals; spelled `subagent-typ`, 0 unjudged and 2 refusals; with an added `retired-model`, 1 unjudged and 1 refusal. An undeclared key takes `page/property/judge.ts:119`, never `unjudged`, so neither class can appear here.

The audit named none of them until `tools/audits/pages-hold-properties.ts` was changed at e8a211ba0f.
