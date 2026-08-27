---
id: 87f62b1e-0bc6-51e8-9415-45ab941d9c8a
page-type-slug: finding
title: "Migration check anchors wrong tree"
domain-slug: domain/global
---

# Claim

`no-raw-proc-mutation`'s `findRepoRoot` anchors on the running check module's own path rather than the project worktree, so a proc-changing deploy invoked from outside its worktree mis-compares a clean migration as drifted, and the resulting violation message tells the operator to regenerate the migration content, which cannot fix a mismatch of this cause.

# Evidence

Source: project #16059 (domain: `code-harness`), `someday_maybe`. No objective — captured, never defined; retired from `notes` 2026-08-15. Found by #15971's second implementer, diagnosing why that deploy died at `deploy_expand_migration` with 7 `no-raw-proc-mutation` violations on a migration never hand-edited.

**The seam.** `applyMigrationBySeq` (`apply-migration.ts:172`) calls `runMigrationChecks` in-process. `no-raw-proc-mutation` -> `loadProcCompileEntries()` -> `findRepoRoot()` (`no-raw-proc-mutation-io.ts:27`) anchors on the check module's own path, never the worktree, while `applyExpandMigrationsBackstop` threads `featureWorktree` into every other phase. The byte-comparison alone uses a different tree, so deploy works for six of seven phases and mis-compares on the seventh.

**Two-sided reproduction** (migration #5521, one variable): from the project worktree, `bun ops migration check --seq 5521` -> OK; from `~/code`, same command -> FAILED, 7 violations, matching #15971's reported failure.

**Why the message makes it worse.** It says "regenerate the migration content" — wrong here since the content already is the emit (7/7 byte-equal, verified independently); regenerating reproduces the same failure. Only the diff separates a real hand-edit from a tree mismatch, and under a mismatch it is the branch's own change.

**Cost:** ~1.5h on a live fix (#15971), one lead cycle, one re-dispatch; recurs for every proc-changing deploy run outside its worktree.

**Fix options, none chosen:** (a) message-only, name the mismatch and compiled root; (b) thread a proc-source root through `MigrationCheckInput`, matching every other phase — the correct fix; (c) refuse-and-explain off-worktree.

**Class:** a fourth case of ember's rule to prefer the authoritative record over a local copy; the skewed copy is the compiled proc sources, a false positive rather than the usual false negative. Filed under #15971, homed ember; may belong in dalla's devops backlog, her call.
