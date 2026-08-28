---
id: 7feb4f3d-74de-541a-b68b-ef87624718ee
slug: ast-grep-seeds-a-discovery-file-that-was-never-there
page-type-slug: finding
title: "The ast-grep check seeds a discovery file that was never there"
domain-slug: domain/old-check
---

# Claim

The `ast-grep` check declares `ts-file:code:packages/infra/checks/src/lib/ast-grep-discovery.ts` among its dispatch seeds, and no file of that path stands in either repository or anywhere in the code repository's history. The seed names no node, so it stands for nothing and retriggers nothing. A unit test asserts the same literal is present, so the dead seed is held in place by a test as well as by the table.

# Evidence

`tools/lib/check-workflow/check-configs-ast-grep.ts:110` holds the entry, inside the `dispatchNodes` array `astGrepCheck` returns. `ciMetaChecks` in `check-configs-ci-meta.ts` calls `astGrepCheck`, which is how the seed reaches a declared table.

Found on 2026-08-24 by `dispatch-seeds-resolve`, weighing 1804 declared seeds against the graph at code commit `f28fded`: "`ts-file:code:packages/infra/checks/src/lib/ast-grep-discovery.ts` names no node in the graph, so nothing it stood for retriggers whatever declared it — declared by 1: check-configs-ci-meta.ts `ciMetaChecks` ast-grep." That check has since been removed, on Alan's ruling that nothing may run a graph build; the seed it named is why this is written down.

Checked separately from the check's own answer: `git ls-files` in `~/repos/code` and in `~/repos/instructions` matches no path containing `ast-grep-discovery`, and `git log -- packages/infra/checks/src/lib/ast-grep-discovery.ts` in `~/repos/code` returns no commit, so the path never held a tracked file under that name.

The three seeds beside it in the same list all resolve to files that stand: `packages/infra/checks/src/checks/check-ast-grep.ts` in the instructions repository, and `packages/infra/checks/src/lib/ast-grep-rules.ts` and `packages/infra/checks/src/lib/check-configs-ast-grep.ts` in the code repository. So the entry is one wrong name in an otherwise live list rather than a list pointing at a moved tree.

`tools/lib/check-workflow/check-configs-ast-grep.unit.test.ts:106` carries the same literal, so dropping the entry means dropping the assertion with it.

Worth deciding: whether the entry is dropped as a name for a file that was never written, or whether it was meant for a file that stands under some other name — `ast-grep-rules.ts` and `ast-grep-rule-template.ts` are the two candidates in that directory.
