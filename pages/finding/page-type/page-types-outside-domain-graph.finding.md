---
id: a2dc97bd-817a-534c-a100-2c77f99d37f3
slug: page-types-outside-domain-graph
page-type-slug: finding
title: "Seven page type documents stand outside the domain graph, so the ownership tree has eight roots"
domain-slug: page-type/page-type
---

# Claim

Seven page type documents stand outside the domain graph, so the ownership tree has eight roots rather than one.

`chess-game` and `chess-puzzle` name themselves in `domain-parents-slugs:`; `issue`, `life-theme`, `question`, `relationship-topic` and `to-do` declare the key with no value. Each carries its own properties up beside `global` instead of beneath it, and the persona descent reaches none of them.

# Evidence

`bun tools/owns.ts --tree` prints 4388 lines under eight roots: `global` (4285), `chess-game` (26), `to-do` (25), `chess-puzzle` (16), `question` (14), `issue` (11), `life-theme` (6), `relationship-topic` (5). Every row under the seven reads "the descent reaches no persona".

Read from the frontmatter of the seven documents on 2026-08-20. Whether each of them ought to sit beneath `global` and where is not measured here, and neither is whether the self-naming pair and the empty-value five are one fault or two.
