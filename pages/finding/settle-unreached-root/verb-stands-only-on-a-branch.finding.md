---
id: 6732c13d-26e9-5727-bf61-08571281d969
slug: verb-stands-only-on-a-branch
page-type-slug: finding
title: "Verb stands only on a branch"
domain-slug: domain/global
---

# Claim

The verb the whole sequence of `domains/tasks/code-harness/settle-unreached-root.md` turns on stands only on branch `project-18822`: `ops graph unreached-roots` is not on main and that branch is not an ancestor of it. A seat picking the task up off main after 18822 is abandoned gets `ops: unknown command` from stage 1, and nothing watches that edge.

# Evidence

Raised by the seat that read `domains/tasks/code-harness/settle-unreached-root.md` on 2026-08-13 under `review-instructions`, and relayed here rather than re-derived: it found the verb with `git log -S` after failing to find it on main, and read its source at `packages/infra/workspace/cli/src/graph/unreached-roots.ts` on the branch. I ran neither.

That reading also disproved a finding filed earlier the same night from the reading of `domains/code-check.md`, which reported the verb as existing nowhere: it does report largest-on-disk first, does emit `unreachedPackages` and `unreachedBytes`, and calls each entry a `root`. That finding has been deleted, its claim having stopped being true.

The seat left the prose alone on the ground that it is right about the tree the task is run in. Nothing here measures whether 18822 will land or be abandoned.
