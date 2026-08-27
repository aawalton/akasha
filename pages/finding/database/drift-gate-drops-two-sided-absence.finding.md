---
id: 287bfd2a-ae68-5abd-bd1f-5217dc73e2e6
slug: drift-gate-drops-two-sided-absence
page-type-slug: finding
title: "Drift gate drops two sided absence"
domain-slug: domain/database
---

# Claim

`changedVersusMain` drops any path absent from BOTH `origin/main` and the worktree, so the snapshot drift gate structurally cannot see a regen deleting a snapshot file main never carried. `blobAt` returns null for "not on main" and `workingFileContent` returns null for "not in the worktree"; the filter keeps a path only where the two differ, and `null !== null` is false. Against main that is genuinely zero drift — but the dropped object still exists on live, which is the applied-but-unlanded case.

# Evidence

Read 2026-08-07 off the `~/code` checkout, in `packages/shared/supabase/migrations/cli/src/lib/snapshot-drift.ts`.

`blobAt` at `:52-55` runs `git show <ref>:<path>` and returns `result.ok ? result.stdout : null`, so a path not on `origin/main` reads as null. `workingFileContent` at `:57-63` is a `readFileSync` in a `try`, returning null from the `catch`, so a path not in the worktree reads as null too. The two absences are spelled the same way and nothing downstream tells them apart.

`changedVersusMain` at `:71` builds its population from `git status --porcelain` and then filters it at `:96-99`:

    const mainContent = blobAt(worktreeRoot, "origin/main", path)
    const workingContent = workingFileContent(worktreeRoot, path)
    return mainContent !== workingContent

A path absent from both sides evaluates `null !== null`, which is false, and it leaves the population before `decideSnapshotDrift` — reached from `checkSnapshotDrift` at `:239` via `:245` — ever sees it.

The gate is not wrong about its own question. Its docstring at `:65-70` scopes it to drift against `origin/main`, and against main a file on neither side is zero drift. What the reading records is which real case that scoping cannot reach, not an error in it.

Found emptying `dirty/skills/pages-system/findings.md`, where it was recorded 2026-07-28 by `project-16848` citing lines `:101-105`; the code has moved four lines since and the shape is unchanged.
