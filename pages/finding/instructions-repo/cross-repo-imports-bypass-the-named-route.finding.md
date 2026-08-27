---
id: 29ae71d3-44d3-51fb-9f39-15f12e5dc6bb
page-type-slug: finding
title: "115 files import a code-repository package by a bare specifier rather than through code-import.ts, so a workspace assembled wrong dies with an unattributed module error"
domain-slug: repo/instructions-repo
---

# Claim

`pages/repo/instructions-repo.md` states as a Condition that every code-repository module this repository loads comes through `tools/lib/code-import.ts`, which resolves at call time and throws naming the reference and the root. The Condition does not hold for 115 files: they import a code-repo package by a bare specifier, which fails at load with a raw `Cannot find module` naming neither repository nor cause, before any of the module's own code runs.

# Evidence

Measured 2026-08-25 against the instructions repository at `e6123956` and the code repository at `main`.

Scanned 4311 `.ts` files in the instructions repository, `node_modules` excluded, for `from "@scope/name"` where the scope appears as a package scope in the code repository's own `bun.lock`. Those scopes are `@alanwalton`, `@archive-of-worlds`, `@audhdalan`, `@automation`, `@collections`, `@infra`, `@shared`, `@smilingjenny` and `@temper`.

137 import sites across 115 files reach a code-repo package by a bare specifier. 132 files mention `tools/lib/code-import.ts`. The largest single specifier is `@shared/utils-narrow` at 28 sites; then `@shared/pages-query` at 20. By directory the largest group is `packages/infra/checks` at 19 files, which is the checks engine itself.

The observed failure: on pipeline 88, twelve check steps exited 2 at 23:31:19 on `error: Cannot find module '@shared/utils-narrow' from packages/infra/checks/src/lib/cli-args.ts`. `packages/infra/checks/src/run-check.ts` reported 2 (tool error) rather than a violation, correctly, and the branch was never judged. Seven further steps blocked behind them, for 19 red of 116 with zero violations among them.

NOT measured. Whether any of the 115 would in fact fail in a container — only the one site above was observed failing. Whether some of the 115 stand in directories that are copies of code-repository code rather than instructions-repository code, where a bare specifier would be correct. Dynamic `import()` and `require` forms: the scan reads only static `from "..."` clauses, so the true count is at least 137 and not exactly it. Why the container's workspace lacked the package on that run: the trigger is not established, and the class has not recurred across pipelines 92 to 96, which carried 519 steps with no exit 2 and one tree-sha each.
