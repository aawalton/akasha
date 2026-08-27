---
id: e00d8060-ec1b-5846-aef5-e2a39ccafb36
page-type-slug: finding
title: "Reaches from the instructions repo into the code repo break without anything reporting it"
domain-slug: repo/instructions-repo
---

# Claim

The instructions repo reaches into the code repo by path and by package specifier, and
nothing in either repo reports when one of those reaches stops resolving.

Three kinds of reach stand today. `codeModule()` and `codeRefFile()` in
`tools/lib/code-import.ts` take either a `.ts` path or a package specifier and resolve
it against the code root.

# Evidence

Taken on 2026-08-23 against the code repo at branch `change-19458`, one commit after
`9d39e29699` removed `packages/infra/workflow-dsl` and 51 `*.workflow.ts` files.

Four reaches by package specifier were probed by resolving each against the worktree
and importing it. Three of the four were already broken, and neither the 121 typecheck
errors nor the 89 test failures on that branch named any of them:

    IMPORT-FAIL  @infra/ci-workflows/bootstrap-workflow -> Cannot find module '@infra/workflow-dsl/ci-identifiers'
    RESOLVE-FAIL @infra/ci-workflows/prep.workflow      -> Cannot find module (the file was deleted)
    OK           @infra/ci-pipeline-core
    IMPORT-FAIL  @infra/local-executor                  -> Cannot find module '@infra/workflow-dsl/inputs-hash'

`@infra/ci-pipeline-core` passed only because its one reference to the deleted package
was `import type`, which erases before run time.

`tools/lib/bootstrap-code.ts` held `const PREP_WORKFLOW = "@infra/ci-workflows/prep.workflow"`,
naming a file deleted in `9d39e29699`, and `tools/lib/bootstrap-run.ts` called it. Nothing
reported this for the life of the branch.
