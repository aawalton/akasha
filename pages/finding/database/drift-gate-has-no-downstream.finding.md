---
id: 3df13d92-36bf-5733-90c7-a07778e3a384
slug: drift-gate-has-no-downstream
page-type-slug: finding
title: "Drift gate has no downstream"
domain-slug: domain/database
---

# Claim

The snapshot drift gate is a single-instant check on UNCOMMITTED state with nothing downstream of the commit. `changedVersusMain` builds its population from `git status --porcelain`, so a poisoned snapshot file leaves that population the moment it is committed, in every project, on every later run. And `checkSnapshotDrift` has two call sites repo-wide: `migration run`, and a deploy path that skips its own regen once no migration is pending. `project commit` and `project check` are not drift-gated.

# Evidence

Read 2026-08-07 off the `~/code` checkout.

THE POPULATION. `packages/shared/supabase/migrations/cli/src/lib/snapshot-drift.ts:71` declares `changedVersusMain`, whose docstring at `:65-70` states the rule it applies: "Changed set = dirty per `git status` AND content differs from `origin/main`". It runs `PORCELAIN_STATUS_ARGS` (imported at `:17`) and filters what comes back. `git status` reports nothing for a path already committed, so a committed file cannot enter the population at all — the filter at `:96-99` never gets the chance to judge it.

THE CALL SITES. `git grep` for `checkSnapshotDrift` over `packages/**/*.ts`, excluding `dist/` and `.test.ts`, returns two calls: `migrations/cli/src/migration/run.ts:204`, and `alanwalton/projects/cli/src/lib/move-to-deploy-migrations.ts:215` inside the local `failOnSnapshotDrift` declared at `:210`. `regenViaShadow` has three: `run.ts:197` and `move-to-deploy-migrations.ts:77` and `:174`.

THE SKIP. Both deploy pairs sit behind an early return. `move-to-deploy-migrations.ts:56-58` loads `loadPendingMigrationsForProject({ projectSeq, phase: "expand" })`, passes it to `decideMigrationPhaseAction`, and returns on `action.kind === "skip"`; `:144-146` does the same for `contract`. The regen at `:77`/`:174` and the drift check at `:86`/`:183` are downstream of those returns, so a project with nothing pending deploys with neither.

NOT VERIFIED. The incident the source cites — a regen on project 16829 deleting 84 lines across `_compose_completion_progress.sql` and `_enforce_page_coherence.sql`, caught only because a worker chose not to commit two files — is work-state I did not reconstruct. What is read here is the shape that makes such an outcome reachable.

Found emptying `dirty/skills/pages-system/findings.md`, which held this as two entries, recorded 2026-07-28 by `project-16829` and `project-16850`.
