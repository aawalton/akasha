---
id: 550adadd-d8aa-5dcd-8367-056b5feba1b7
page-type-slug: finding
title: "Worker role document denied"
domain-slug: page-type/role
---

# Claim

The docblock on `UNNAMEABLE_ROLES` in `packages/agents/shared/agent-roles.ts` states that `worker` is a role no role document backs, and `domains/roles/worker.md` exists.

# Evidence

`packages/agents/shared/agent-roles.ts:77–80`, code repo at `1313565199`, reads: "Every OTHER role the vocabulary carries is nameable, including one no role document backs (`worker` — the positive counterpart to `unknown`, meaning no specific role applies), which is why the split is by subtraction rather than by asking whether doctrine exists."

`domains/roles/worker.md` stands in the instructions repo, declaring `domain-slug: worker`, `domain-parents: role`, `default: true`, `reviewed-at: 2026-08-06`.

The two are in tension inside one file's own reasoning. The same docblock, twenty lines above, says each role's doctrine "lives at `domains/roles/<name>.md` in the instructions repository — which is also what makes the role EXIST, the document being the registry", and `packages/agents/shared/agent-role-vocabulary.ts:9` says "THE SOURCE IS `domains/roles/*.md`, AND NOTHING STANDS BESIDE IT." By that source, `worker` is backed.

What the parenthetical is offered as is a reason: it is the stated ground for splitting the vocabulary by subtraction rather than by asking whether doctrine exists. The split itself is not in question here and its behaviour is unaffected — `UNNAMEABLE_ROLES` holds `human` and `unknown` only, and `roleVocabularyFrom` subtracts exactly those.

Not measured: whether `domains/roles/worker.md` postdates the docblock, and whether any other role in the derived vocabulary lacks a document. I read the two files and the directory listing of `domains/roles/`, which holds thirteen documents, and did not walk the git history of either.

Found while ingesting `dirty/questions/domain-layer-doctrine.md`, checking a quarantined claim that `purge` shipped in a closed `AGENT_ROLES` taxonomy with no role document behind it. That claim is dead — there is no `AGENT_ROLES` — and this is the inverse case the same docblock leaves standing.
