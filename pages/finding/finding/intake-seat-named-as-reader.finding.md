---
id: 9262a5ff-30bc-581e-b705-a62a86dea478
page-type-slug: finding
title: "Intake seat named as reader"
domain-slug: page-type/finding
---

# Claim

The comment on the `domain` key in `tools/document/schemas/finding.ts` describes that key's reader as an intake seat, and `intake` is a role the estate retired.

# Evidence

`tools/document/schemas/finding.ts:11–13` reads: "The domain the observation bears on, by slug: what an intake seat sweeping its own area filters on, and the ONLY key."

There is no intake role. `domains/roles/` holds thirteen documents — archivist, coach, companion, developer, game-master, handler, interviewer, lead, manager, persona-craft, recorder, scenewright, worker — and `intake.md` is not among them. That directory is the whole registry: `packages/agents/shared/agent-role-vocabulary.ts:9` in the code repo says "THE SOURCE IS `domains/roles/*.md`, AND NOTHING STANDS BESIDE IT", and lines 16–25 name the removal, "THE DECLARED EXTENSION SET IS GONE, ON ALAN'S RULING OF 2026-08-03 … `deliver`, `define`, `intake`, `purge` and `reviewer` were held by rows the corpus had stopped naming."

The reader that does exist is named a few lines away and by a live document: `domains/roles/lead.md` carries the task `review-findings` — "the findings filed against domains you own, read as a set rather than one at a time" — which is the act the comment describes, filed under a role that stands.

What the comment is offered as is the reason the key is a domain slug and the only key, so the reason survives its own example: findings are read per domain by whoever owns that domain. The schema behaviour is unaffected, the key being `{ name: "domain", cardinality: once, value: slug }` either way.

Not measured: whether any other live document or comment names the intake role. I read `domains/roles/`, the two code files above, and this schema, and did not sweep either tree for the term. `rg -i intake` over the instructions repo outside `dirty/` returned this line and nothing else, so within that tree it is the only one.

Found while ingesting `dirty/questions/domain-layer-doctrine.md`, whose entries are built on an intake role and its layer. Those entries were cut; this is the one live mention of that role I met while cutting them.
