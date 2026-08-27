---
id: f8377662-3997-5c73-b8b6-2cfbd5df6059
slug: integration-client-stub-leak
page-type-slug: finding
title: "Integration client stub leak"
domain-slug: domain/global
---

# Claim

Two integration suites under `packages/alanwalton/projects/cli/src/project/` fail intermittently when the shared integration process runs them together, and pass on a re-run and in isolation.

# Evidence

Observed on 2026-08-10 while running `ops tests run packages/alanwalton/projects/cli/src/project packages/alanwalton/projects/core/src` from the #18506 worktree. `move-to-obligation-gate.integration.test.ts` and `obligations-write-boundary.integration.test.ts` both failed inside `cleanupFixtures` with `TypeError: sb.rpc is not a function`, raised at `packages/shared/pages/access/src/delete.ts:121`.

The same command over the same paths passed on `~/code`, and the identical command re-run in the worktree minutes later passed with every group green — 187 cli, 29 database, 29 integration, 753 unit. `obligations-write-boundary.integration.test.ts` also passes when run alone, in both checkouts.

Nothing in #18506 touches `delete.ts`, the obligations verbs, or supabase client construction; its only code-repo files are a new `status-options` verb, its unit suite, a registry line and a comment on `types.ts`. `ops tests run` puts every `integration` suite in ONE bun process and its own help records that `mock.module` is process-global, which is the shape a leaked client stub would take.

`domains/file-kinds/tests.md` Trust reads a failure that clears on a re-run as broken, so this is filed rather than left to the next run to rediscover.
