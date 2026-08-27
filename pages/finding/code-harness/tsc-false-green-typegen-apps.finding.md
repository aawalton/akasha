---
id: 5fa9a34b-1842-5a86-94d4-711a85999f21
page-type-slug: finding
title: "Tsc false green typegen apps"
domain-slug: domain/global
---

# Claim

Root `tsc -b` is a false green for five apps (`alanwalton/web`, `alanwalton/atlas/web`, `archive-of-worlds/web`, `audhdalan/web`, `temper/web`) whose route types exist only after `react-router typegen`, which no root-level invocation runs and which fails locally because `vite.config.ts` reads `NEXT_PUBLIC_ELECTRIC_URL`, missing from `~/.secrets.env`, so every agent falls back to a check that never examined them.

# Evidence

Project #16539 (domain code-harness, status someday_maybe). Found by project-16256 being caught by it: a refactor reported clean on a green root `tsc -b` was accepted, then CI (pipeline 26244) failed on a real `TS2322` in the same file.

MEASURED: root `package.json` has no typegen step; root `tsconfig.json` references 111; declared workspaces 380. The five apps — `alanwalton/web`, `alanwalton/atlas/web`, `archive-of-worlds/web`, `audhdalan/web`, `temper/web` — have route types that do not exist until `typegen` runs, and no root invocation runs it, so a green root `tsc -b` is no evidence at all for them.

OBSERVED (not inferred): one real type error live in `alanwalton/web` (a deleted narrowing annotation on an injected dependency), invisible to root `tsc -b`, caught only by CI.

NOT MEASURED: 271/380 workspaces are not directly referenced from root tsconfig; not the same as uncovered (references are transitive); how many are genuinely uncovered is unknown.

Why the fallback happens: `react-router typegen` evaluates `vite.config.ts`, which reads `NEXT_PUBLIC_ELECTRIC_URL` — absent from `~/.secrets.env` (only `ELECTRIC_SECRET` is present) — so `bun run typecheck` fails and every agent falls back to what runs. Both known-good values already exist: CI injects a placeholder (`packages/infra/checks/src/lib/check-configs-app-typecheck.ts:67`); the dev-server injects the real URL (`packages/agents/dev-server/cli/src/dev-server/bootstrap.ts:147`).

Diagnosis: an unrunnable rung plus a fallback that lies, together silent. Candidate remedy, not decided: each app's `typecheck` script supplies the placeholder, as CI does. Relates to #16460 (same class, different carrier); whether it folds in is undecided.

Confirmed 2026-07-27 (athena-intake): transitive closure of root `tsconfig.json` references = 255 projects, none of the five apps reached; `.react-router/types` absent in all 5.

Row captured but never defined; moved off the retired `notes` attribute on 2026-08-15.
