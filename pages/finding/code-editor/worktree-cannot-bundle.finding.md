---
id: 41b033a5-c0f3-5a87-abc3-f4f3831fba7e
slug: worktree-cannot-bundle
page-type-slug: finding
title: "The ops extension cannot be bundled from a worktree, because its build assumes the main checkout"
domain-slug: domain/code-editor
---

# Claim

The ops extension cannot be bundled from a worktree. Its build resolves the code checkout as a sibling of the repository root, which is only true of the main checkout, so a build from anywhere under `~/worktrees` exits reporting it cannot find that checkout.

# Evidence

`extensions/ops/esbuild.mts` line 88 reads `path.resolve(import.meta.dirname, '../../../code/node_modules')`. That directory is `<checkout>/extensions/ops`, so three levels up is whatever sits beside the checkout root. From `~/code-editor/extensions/ops` it lands on `~/code` and is right. From `~/worktrees/<branch>/extensions/ops` it lands on `~/worktrees/code`, which does not exist, and the build exits at line 92 with its own message.

A worktree also carries neither the root nor the `extensions/` `node_modules`, both of which the typechecker and the test run need. Those can be linked in from the main checkout by hand and removed again before committing, which is what was done to verify a change tonight.

The effect is bounded: only bundling is blocked, and bundling is only needed for promotion. Typecheck, hygiene and the extension tests all run from a worktree once the two links are in place. So work can be done and committed on a branch in a worktree, and only the promote step has to happen from the main checkout.

Not measured: whether an absolute path or a walk-up to the nearest checkout would break any other caller, and whether anything else in the build makes the same sibling assumption. The reading was taken from the source and from one failed build, not from a survey of the build tooling.
