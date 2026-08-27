---
id: 0fb6e739-5000-59bf-9e17-09d0f884c999
slug: misordered-names-no-act
page-type-slug: finding
title: "Misordered names no act"
domain-slug: page-type/refusal
---

# Claim

`refusals/project-status-misordered.md` names no act, where both siblings printed by the same check do. The direction is settled — the vocabulary is declared in `tools/lib/project-statuses.ts` and the code union is a projection of it, so the projection moves into the declaration's order. What is not settled is that the act crosses into the code repository over a branch, CI and a deploy, which no other refusal here asks of its reader.

# Evidence

Raised by the dispatched `review-instructions` seat reading the document on 2026-08-12, which ran the check against a swapped code checkout and four fixtures rather than reading the arm.

What it found settles nothing on its own: the rollout marks reach add and remove only, and `ops project status-options` widens and narrows the options row and says nothing about order. Alan settled the direction in prose under #18506.

Its recommendation was one sentence naming that direction. It stopped short over the cost it puts on the reader.

Not measured: how often this arm fires, and whether a reader who reaches it can deploy.
