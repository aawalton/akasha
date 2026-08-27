---
id: 81d085ac-cee4-5272-87ed-216152f34f68
slug: guard-misses-its-own-subjects
page-type-slug: finding
title: "Guard misses its own subjects"
domain-slug: domain/global
---

# Claim

The workflow import-cleanliness guard is not selected by a change to the workflow files it guards, so it runs on a branch only when the DSL it happens to import changes.

# Evidence

`packages/infra/ci/cli/src/lib/workflow-import-cleanliness.cli.test.ts` guards every
`*.workflow.ts` against doing git or filesystem IO at module scope. It finds them by
walking a `git archive` extract and importing each by path, so no static edge runs from
any workflow file to it.

Its import cone is three files — `workflow-dsl/src/discovery.ts`, `dsl/types.ts` and
`dsl/ci-identifiers.ts`. Measured on branch `project-18958` at `ef0d0caa39`, after the
path-space fix that repaired cross-package reachability: a change to
`packages/infra/checks/src/checks.workflow.ts` selects 0 of 614 slow suites and does not
select this guard. A change to `discovery.ts` selects 10, including it.

So it is selected, but by its incidental dependencies rather than by its subjects. The
fault it exists to catch landed on 2026-08-11 in `85b898cc15`, in a workflow file, and
would still not select it today.

The reachability instrument added by #18958 cannot see this class. It reports a suite
whose cone is EMPTY, and this cone is not empty — it reaches three files that have
nothing to do with what the suite asserts. The registry entry it needs is a watch glob
over `packages/**/*.workflow.ts`, which is the same shape `dotfiles-link` already
carries for a subject it can never import.
