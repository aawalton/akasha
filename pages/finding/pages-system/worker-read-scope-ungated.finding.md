---
id: fcadb16a-dfeb-567b-90ce-5c3abc346c18
page-type-slug: finding
title: "Worker read scope ungated"
domain-slug: domain/pages-system
---

# Claim

Nine typed pg-surface loaders take `pipelineIdScope` as an optional argument, and nothing in the repository verifies that a worker call site supplies one. A read that omits it returns rows from every pipeline rather than the caller's own, compiles, type-checks and passes every gate.

# Evidence

Nine loaders under `packages/shared/pages/access/src/pg/` declare `pipelineIdScope?: string`: `get-pages-by-ids.ts`, `load-all-non-terminal-{pipelines,steps,workflows}.ts`, `load-cascading-child-{steps-under-resolved-workflows,workflows-under-resolved-pipelines}.ts`, `load-pipeline-root-by-seq.ts`, `load-steps-for-workflows.ts`, `load-workflows-for-pipelines.ts`. Each appends its scope predicate only when the argument is present — `load-all-non-terminal-steps.ts` reads `if (args.pipelineIdScope !== undefined)` and otherwise emits no scope clause, its own comment saying "When unset, behavior is unchanged".

`packages/infra/checks/src/checks/check-no-raw-pages-sql.ts` carries no worker-mode path rule: it names no path under `packages/infra/ci/worker`, and its matcher `lib/ts-pg-pages-queries.ts` tests three regexes over string literals and nothing else. Searching `packages/infra/checks/src/` for `pipelineIdScope` or `enforcePipelineScope` returns no check. The one live statement a gate makes about that tree is the opposite of enforcement: `check-pages-gin-friendly-sql.unit.test.ts:219` pins `isExcludedByPath("packages/infra/ci/worker/src/foo.ts")` as true.

A convention stands in place of a gate. `packages/infra/ci/worker/src/reactors/sweep-loaders.ts` wraps each loader in a function taking `pipelineIdScope: string` positionally and required, so a worker read routed through that module cannot omit the scope. A call site importing `@shared/pages-access/pg` directly bypasses it with no signal. That module's header cites `../../docs/scope-contract.md`, and no such directory exists.

The write side is not in this state: `enforcePipelineScope` at `packages/shared/pages/access/src/guards.ts:133` throws `ScopePolicyError`, and `patch.ts` and `create.ts` call it unconditionally.
