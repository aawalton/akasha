---
id: cd21dc6a-9cd2-55ab-a184-ad061691331d
slug: backfill-verb-says-its-executor-is-held
page-type-slug: finding
title: "Backfill verb says its executor is held"
domain-slug: domain/alanwalton-app
---

# Claim

The wired `ops persona backfill-wallpapers` tells its user in three places that the bulk executor is held and unbuilt, while the same file implements it and the same help object declares the flag that runs it. The bulk run those surfaces say is pending completed on 2026-07-05 over every target. The target count all three quote is short by two. Nothing refuses any of it: the one wired gate over `ops` help prose resolves flag tokens against the registry and reads no claim about project state.

# Evidence

Measured 2026-08-08 at `~/code` on `main`, while emptying `dirty/code/packages-alanwalton-personas-docs-wallpaper-backfill.md`. One tracked wired file, `packages/alanwalton/personas/cli/src/persona/backfill-wallpapers.ts`.

Says held, three times. `help.description` at lines 94-100 — what `--help` prints — reads "Dry-run/classify only — renders nothing, holds the executor (bulk run gated on the #14565 cluster-offload cutover)". The header docblock at line 25 reads "`--dry-run` (the only supported mode this child project)". The `OperationalError` thrown on a bare invocation, lines 185-188, routes the user to "docs/wallpaper-backfill.md", which is not a file: `git ls-files 'packages/alanwalton/personas/**/*.md'` returns nothing.

Implements it anyway. The same `help` object declares `--execute` at lines 111-115. Line 176 branches on it and line 177 awaits `runWallpaperRestore`, imported at line 43 from `./wallpaper-restore-effect`, whose body performs the bulk restore. Executable wiring, not a comment.

The run is finished. `~/Pictures/14617-restore-review/outcomes.jsonl` holds 39 lines dated 2026-07-05: 38 `restored`, 1 `retried-1-times`, 0 `failed`, with the before/after pairs beside it.

The count is stale. The `--execute` help at line 114 and the error string at line 186 both quote "the 39 per-level targets". A read-only `ops persona backfill-wallpapers --dry-run --json`, exit 0, returns `enumerated 43`, `upscaleRuns 143`, `sourceGone 43`. Exactly two rows carry a null `relationshipLevel`, and `isPerLevelBackfillTarget` scopes on a non-negative integer level, so the live scope is 41.

Nothing refuses it. `ops enforcement list` names 242 gates; the only one over `ops` help prose is `check-cli-help-flag-references`, whose pure core at `packages/infra/checks/src/lib/cli-help-flag-references.ts` compares flag TOKENS in help against the flag surface the registry declares. It holds no predicate over whether a claim about project state is true.
