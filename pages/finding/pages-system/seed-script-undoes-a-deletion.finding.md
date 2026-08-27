---
id: e0a0a702-2906-59f2-987b-af74d67b6d43
page-type-slug: finding
title: "Seed script undoes a deletion"
domain-slug: domain/pages-system
---

# Claim

A page-type seed script is a get-or-create, so it silently recreates a page-type somebody deliberately deleted. `packages/alanwalton/chess-games/src/chess-game/seed-page-types.ts` states "a re-run is a no-op (creates 0 / 0)", which holds only while the type still exists: once deleted, the same re-run creates it again and reports success. A deletion is not durable while a seed script can rebuild it, and nothing warns whoever runs one that it is undoing a decision.

# Evidence

Read 2026-08-07 against `~/code`.

`packages/alanwalton/chess-games/src/chess-game/seed-page-types.ts` carries the pattern in its own header: "Page types are data (ordinary rows in `public.pages`), so this is a get-or-create, not a DDL migration. Wraps `ensureChessGamePageType(sb)`; a re-run is a no-op (creates 0 / 0)." Its help repeats it: "Page types are data (ordinary rows, not schema), not a DDL migration — this is a get-or-create. Re-running is a no-op." The verb reports `pageTypesCreated` / `propsCreated` and treats both being 0 as up-to-date.

The no-op claim is conditional on a state the comment does not name. Get-or-create is a no-op when the row is present and a CREATE when it is absent, and a deliberate deletion is exactly what makes it absent. So the one run where the script does something unintended is the one its own documentation describes as harmless.

The scripts are live and plural: `seed-page-types.ts` stands under `packages/collections/shows/src/cli/`, `packages/alanwalton/awen/src/awen/` and `packages/alanwalton/chess-games/src/chess-game/`, beside a wider tracked `seed-*` family.

A quarantined document recorded the harm as observed rather than hypothesised: a pass deleted the `domain` page-type, its 29 rows and its two property-definitions, and a persona seed script would have recreated the type and its two-way relation on the next run. That document argued from a schema-is-data rule in the root `CLAUDE.md`; that citation is not live (`git ls-files *CLAUDE.md` returns one path, a check fixture) and no live instruction carries such a rule. Filed on the mechanism alone.

Searched `~/memory/findings/` for `get-or-create`, `seed-page-types` and `seed script` before filing. Three files match; the two chess ones describe a verb inventory and call the pattern idempotent, neither claiming a deletion is undone. Nothing carries this.
