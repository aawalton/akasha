---
id: 9f31a4c5-c93d-50e0-8e6f-f13d5389d3a5
page-type-slug: finding
title: "Proxy closure count stale"
domain-slug: domain/agent-fleet
---

# Claim

The proxy version-hash module states a closure size eight packages short of the closure it computes. `oauth-proxy-tree-version.ts` says the hash covers a runtime-dependency closure of 21 packages; applying the definition the same docblock gives, and that the module's own BFS implements, the closure is 29. A reader sizing what a proxy version bump covers reads the smaller number.

# Evidence

Read against the `~/code` working tree on 2026-08-07, while emptying `dirty/code/packages-agents-oauth-proxy-claude.md`.

`packages/agents/supervisor/src/oauth-proxy-tree-version.ts:6` states the count in the module docblock: the hash covers the proxy `src/` tree "plus the transitive local-workspace runtime-dependency closure rooted at `@agents/oauth-proxy` (21" packages.

The definition sits in the same file at `:133-134`, above the BFS — "Runtime = `dependencies` union `peerDependencies` union `optionalDependencies`", local workspace packages only — and `:158` is that union in code.

Applying it — BFS from `@agents/oauth-proxy` over every `package.json` in `git ls-files "packages/**/package.json"`, following only specs starting `workspace:`, `devDependencies` excluded — yields 29: the proxy plus 28. The 24 beyond the four the docblock names run `@agents/model-vocab` and `@agents/routing-core`, both `@alanwalton` core packages, `@infra/git-porcelain` and `@infra/workflow-dsl`, and eighteen under `@shared/` from `browser-launch-env` through `verdict`.

The definition is not what drifted. The quarantined CLAUDE.md carried the same "21 packages (proxy + 20 deps)" and named four members — `@agents/oauth`, `@agents/shared`, `@agents/pacing-core`, `@shared/pages-access` — all four in the 29. The two agree on how the closure is built; only the total is stale.

The hash is not wrong: it is computed over the closure at runtime, so it covers all 29 whatever the docblock says. What is wrong is the only stated size of the blast radius — a change in any of the unlisted packages respawns proxies, and a reader reasoning from 21 is reasoning from a number nothing recomputes.
