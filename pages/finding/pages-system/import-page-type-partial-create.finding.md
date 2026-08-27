---
id: e328c2aa-a052-592a-8f1f-0f4053689e57
page-type-slug: finding
title: "Import page type partial create"
domain-slug: domain/pages-system
---

# Claim

`ops notion import-page-type` checks that every relation property has a `--relations` entry before writing anything, but checks that the entry's `target` page-type slug resolves only after the page type row and some property definitions are already written. A bad target slug therefore fails partway through creation, leaving a half-built page type — and since page-type slug uniqueness is enforced, fixing the typo and re-running collides with the row the failed run left.

# Evidence

Read at `packages/shared/pages/cli/src/notion/import-page-type.ts`.

Half the relation contract is already checked up front. Line 173, under "Fail fast: every relation property must have a --relations entry", throws `InputError` for any `relation` or `multi-relation` property missing from the map. `--relations` is parsed earlier still, at line 158, under a comment stating the intent: "Parse --relations up front ... so a malformed config fails before any DB write."

The other half is not. Resolving `entry.target` to a real page type happens in `resolveRelationConfig`, which calls `getPageTypeBySlug` and throws when it returns null. That runs at line 204, inside the loop creating property definitions — and `createPageType` has already run at line 193. The order is: parse config (158), check entries exist (173), write the page type (193), then per property resolve the target and write the definition (204 on).

So a run naming a target slug that does not exist writes the page type row, writes every property definition ahead of the bad relation in `properties` order, then throws. Nothing rolls those back; the command has no cleanup path.

Re-running after the fix does not recover. `createPageType` goes through the `page_type_create` RPC, and `packages/shared/pages/access/src/page-type.ts:204` records that slug uniqueness for page-type rows is enforced by `pages_unique_key_uniq_idx`, so the second run fails on the row the first left.

The target lookup is the one piece of relation validation needing a database round trip, and it is the one left inside the write loop. `targetCache` already memoises those lookups across properties.
