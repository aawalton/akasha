---
id: d44b6807-353a-5e82-8794-22d499d1a42e
slug: ai-infra-ruling-ungoverned
page-type-slug: finding
title: "AI infra ruling ungoverned"
domain-slug: domain/technology
---

# Claim

The technology domain governs no code, while a standing ruling assigns it the AI infrastructure.

`pages/domain/technology.domain.md` carries no `files:` glob, so no file in this repository reaches it. Alan's ruling of 2026-07-27 gives the domain the inference stack, the model configuration, the OAuth proxy and the agent tooling, and every one resolves to another domain instead. The only record that reconciliation is owed stands in two documents under `dirty/`, which the sweep removes.

# Evidence

`pages/domain/technology.domain.md` carries `slug: technology`, `domain-parent-slug: domain/global`, `persona-champion-slug: nimue` and `settled: true`, and no path glob of any kind.

The ruling stands at `dirty/skills/technology/SKILL.md` lines 14-19: "The AI infrastructure is this domain's; using it is not. The inference stack, the model configuration, the OAuth proxy and the agent tooling belong here... That ruling is newer than the packages it governs — `voice-infer/CLAUDE.md` still declares a different owner in writing, and reconciling it is owed". The same document dates the domain's charter to Alan, 2026-07-27. `dirty/skills/technology/rulings.md` carried the matching entry, and the two cited each other.

`ops instructions governs`, given absolute paths, resolves each package away from technology. `infra/voice-infer/package.json` and `infra/inference/package.json` each name `domains/code.md`, `domains/folders/code-repo.md`, `domains/global.md` and `domains/infra.md` — the last carrying `persona-champion-slug: aranya` and `code-path: packages/infra/**`. `packages/agents/model-vocab` names `domains/agent-harness.md` and `domains/folders/agent-fleet.md` among its four. `packages/agents/oauth-proxy` holds 115 files under `git ls-files` and reaches the same agent-fleet glob. No technology document appears in any list.

The contradicting declaration survives only under quarantine. `dirty/code/packages-infra-voice-infer-claude.md` line 8 reads "**Persona lead:** echo — owner of this package and its voice-side generation/render work." A ripgrep for `Persona lead:` across the code repository, excluding build output, returns nothing, so no live document declares a package owner either way.

Not measured: whether the ruling was superseded when the domains were cut, or never implemented. Nothing dated was found either way, and no decision to that effect was searched for outside the two quarantined documents. Which repair is right was not considered.
