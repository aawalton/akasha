---
id: c9cf1ed5-0142-5a1b-8102-6c0c886e54a4
slug: closure-widening-set-hand-kept
page-type-slug: finding
title: "Closure widening set hand kept"
domain-slug: domain/global
---

# Claim

Every caller of `resolveChangeClosure` hand-writes the set of paths that widen it back to the whole tree, and nothing derives that set from what the check reads. A rule module added beside one on the list does not widen, so a change redefining every file's verdict is measured against the few it touched, and the run reports a green over a population it narrowed.

# Evidence

Read 2026-08-10 in worktree `18484` at `e28ee613bf`. Three callers, three hand-kept lists:

- `check-porcelain-status-boundary.ts` — `CLOSURE_WIDENING_PATHS = [...RULE_PATHS, ...BOUNDARY_PATHS]`, five paths.
- `check-color-literals.ts` — two paths, added by #18462, which declares the gap as its `predicate-derivation: open-sample`.
- `check-pages-slug-attribute-readers.ts` — a third list.

`lib/change-closure.ts` puts the demand on the caller in terms: "A caller names the paths that DECIDE what other files are measured against: its rule module, its scanner sources, and any module whose live exports its predicate resolves against." It offers no derivation, and nothing tests that a caller's list is complete.

MEASURED, not reasoned. In a probe tree driven through `check-color-literals --repo-root`, with two color literals planted: a manifest naming `packages/infra/checks/src/lib/color-literal-scan.ts` returns "the whole tree", reads 8,445 files and refuses both. A manifest naming one unrelated source file reads 1 file and exits 0 with both plants standing. The two verdicts differ only by whether the changed path happened to be spelled in the list.

The failure is silent in the direction that matters. A stale list never errors: it narrows, the check passes, and the population line honestly reports the small number it measured. Nothing compares that number against what the change could have invalidated, because the only statement of that is the list itself. This is Derived Reach on `domains/code-check.md` applied to reading rather than to dispatch, and Derived Reach is written about dispatch alone.

Not judged: whether the derivation should be a check's own transitive local import closure, or whether the three lists should become one mechanism. Both reach past any single check.

BOUND. Three callers, found by grepping `resolveChangeClosure` across `packages/`. A fourth written tomorrow inherits the shape and nothing reports it.
