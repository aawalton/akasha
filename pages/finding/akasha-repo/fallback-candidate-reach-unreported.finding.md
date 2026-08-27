---
id: a6106165-d5c2-5a2c-bf79-a01ac96bd899
page-type-slug: finding
title: "A fallback candidate list hides the reaches in it that stopped resolving"
domain-slug: repo/instructions-repo
---

# Claim

Neither `bun run typecheck` nor the test suite sees them: the reaches are strings resolved at
run time, so a reference to a file that has been deleted typechecks clean and passes
every test, then throws the first time somebody runs the command that needs it.

`firstReaching()` in `tools/lib/main-pipeline-creator/code.ts`
takes a list of candidates and throws when none of them exists.

# Evidence

Taken on 2026-08-23 against the code repo at branch `change-19458`, one commit after
`9d39e29699` removed `packages/infra/workflow-dsl` and 51 `*.workflow.ts` files.

`tools/lib/main-pipeline-creator/code.ts` listed three fallback candidates under
`packages/infra/ci/worker/src/pure/`, a directory removed before that branch began.
`firstReaching` returns the first candidate that exists, so the dead candidates were
invisible: the reach kept working off the surviving `pipeline-core` candidate while
reading as though it had two live alternatives.
