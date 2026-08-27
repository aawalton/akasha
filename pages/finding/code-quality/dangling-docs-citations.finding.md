---
id: 3ec3a33f-db4c-567e-9502-ddc4257ec671
slug: dangling-docs-citations
page-type-slug: finding
title: "Dangling docs citations"
domain-slug: domain/code-quality
---

# Claim

Live TypeScript across the code repo cites `docs/<name>.md` documents that resolve in neither repo, so 454 source files route a reader to a document nobody can open.

# Evidence

Measured 2026-08-07 against `~/code` at the checkout in hand, while ingesting a quarantined document about the integration test lane.

Every `docs/<name>.md` string in a tracked `.ts` file was resolved the way a reader would: against the citing file's own directory, then each ancestor up to the repo root, which is how the package-local `docs/` directories were addressed.

- 773 citations in 526 tracked `.ts` files. **None resolve.** Excluding `*.test.ts`, where some strings are fixtures for a citation checker rather than citations, 555 citations remain across 454 source files.
- No `docs/` directory exists at the code repo root, and no package-local one holds any of the named files.
- The targets went two ways. Some were quarantined into the instructions repo with their path flattened — `packages/agents/oauth/docs/403-rebind.md` now stands as `dirty/code/packages-agents-oauth-docs-403-rebind.md`. Others are absent from that tree too: `docs/filler-queue.md` cited from `packages/agents/cli/src/agent/filler-preempt.ts:4`, and `docs/boundary-parsing.md` cited from `packages/agents/devops-monitor/src/snapshot/coerce.ts:13` and `packages/agents/devops-monitor/src/snapshot/supervisor-pod.ts:7`, have no quarantined counterpart.
- The population is one instrument's reading and no more: it matches a lowercase kebab `docs/…md` substring, so a citation spelled another way is invisible to it and the true count is at or above this one.

Why it is silent: a header comment naming a document reads exactly the same whether the document is there or not, and nothing in either repo resolves a citation written in a comment. An agent sent to `docs/boundary-parsing.md` for the reason a coercion is shaped as it is finds nothing and proceeds without it. The instructions repo gates its own links — `tools/gates/links-resolve.ts` refuses a write carrying one that dangles, and resolves the `#heading` too — and the code repo has no equivalent for citations in comments.
