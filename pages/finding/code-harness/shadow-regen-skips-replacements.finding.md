---
id: dbd00e29-ebd5-5ed3-af34-1c00f2546ed2
page-type-slug: finding
title: "The shadow regen skips a replacement migration, and the drift check reads the resulting no-op as clean"
domain-slug: domain/global
---

# Claim

The shadow regen skips a migration whose objects already exist, so a `CREATE OR REPLACE` migration never reaches the committed schema snapshot, and the drift check reads the resulting no-op as clean.

# Evidence

`regenViaShadow` in `packages/shared/supabase/migrations/cli/src/lib/shadow-db.ts` builds a shadow from `schema_baseline`, then replays only the migrations `migrationsAbsentFrom` returns. That function decides by object NAME: `baseline-objects.ts` reads the DDL's object names and calls a migration present when the baseline already holds them. A migration that replaces the body of an existing function names an object that is already there, so it is classified present and never replayed. The shadow keeps the old body and the regenerated snapshot equals the committed one.

`checkSnapshotDrift` in `snapshot-drift.ts` returns `clean` when the regen changed no path. For this failure the absence of a diff IS the symptom, so the check confirms the state it should catch.

Observed on migration #5610 on 2026-08-19. `ops migration run 5610` reported APPLIED and wrote both regen outputs; production carried the new 138-line function while the worktree's snapshot still carried the old 333-line one, and `git status` was clean. The repair that worked was applying the migration's own SQL to `schema_baseline` with `DATABASE_ADMIN_URL` and re-running `regenViaShadow`, after which the snapshot came out at 141 lines with the expected 192 deletions. `decideBaselineMainDivergence` classifies a baseline that equals live as `unlandedContamination`, which `unexplainedDivergences` does not block on, so that repair leaves the sanctioned state rather than a diverged one.

Not measured: how many migrations already applied under this path replaced an existing object and left the snapshot stale, nor whether `baseline-rebuild` would find them. Only #5610 was traced.

One more observation from the same run: `ops migration run --help` says regeneration lands in `~/projects/<projectSeq>/worktree/`, and `resolveWorktreePath` returned `~/worktrees/19419`.
