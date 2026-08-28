---
id: 01a045d6-f2f3-7ae0-b990-bd0c0d9db0f1
slug: unique-key-stated-six-rules-nothing-rendered
page-type-slug: finding
title: "Unique key stated six rules nothing rendered"
domain-slug: page-type/page-type
---

# Claim

Six page types stated a `unique-key`, and no code ever rendered one. Four of the six name holes the naming regex cannot match, so those four could not have been rendered as written. The six values are recorded here because they are the only statement of how those page types intended to be unique, and they are being removed.

# Evidence

The six values, verbatim, as they stood before removal.

| page type | file | `unique-key` |
| --- | --- | --- |
| `workflow` | `pages/page-type/workflow.page-type.md:11` | `"{pipeline-seq}/{slug}"` |
| `page-property-definition` | `pages/page-type/page-property-definition.page-type.md:9` | `"{page-type.slug}/{defined-on.slug}/{key}"` |
| `package` | `pages/page-type/package.page-type.md:14` | `"{repo}/{slug}"` |
| `chess-puzzle` | `pages/page-type/chess-puzzle.page-type.md:8` | `"{puzzleId}"` |
| `chess-game` | `pages/page-type/chess-game.page-type.md:8` | `"{externalId}"` |
| `chapter` | `pages/page-type/chapter.page-type.md:8` | `"{partOf}/{slug}"` |

Four carry holes no naming regex can match. `HOLE` at `page/name/naming/named-for.ts:9` is `/\{([a-z0-9-]+)\}/g`, which admits lower-case, digits and hyphen and nothing else. `workflow` and `package` are pure kebab and match. The other four fail: `page-property-definition` on the dots in `{page-type.slug}` and `{defined-on.slug}`, and `chess-puzzle`, `chess-game` and `chapter` on the upper-case letter in `{puzzleId}`, `{externalId}` and `{partOf}`.

The failure is the character class rather than a missing property. `chess-puzzle-puzzle-id.page-property-definition.md` states `key: puzzleId` and `chess-game-external-id.page-property-definition.md` states `key: externalId`, so both name a property that exists and neither can be addressed. `chapter` is the empty one: it declares no property definition at all, so `{partOf}` names nothing.

Nothing rendered any of them. `constantHolesIn` at `shared/pages-access/src/file-name.ts:35` and `tools/page/page-naming.ts:24` is applied to `named-for` only. `type: template` has no entry in `RULES` at `page/property/value.ts:143-180`, so the value was never parsed or judged either.

The key was read, and consumed by nothing. `camelizeKey("unique-key")` at `shared/pages-access/src/file-rows.ts:37-43` answers `uniqueKey`, which stands in `LIFTED_COLUMN` at `:17`, so the lift at `:186-190` wrote the stated text verbatim into the row's `unique_key` at `:205` and kept it out of `attributes`. `file-read.ts:297` and `:368` put that on the live read path, and `page-type.ts:59-65` reaches it with no `select`. Run over the six files, every one projected its own text into the column. No first-party code reads the resulting `page.uniqueKey`.

Whether the property definition's `default: "{page-type.slug}/{slug}"` materialized `unique-key` on the page types that stated none was not established. The query service that would answer it was unreachable, no keyless page query over `page-type` exists, and the one defaulted property reachable through a keyless query is stated explicitly by all 1103 of its rows, so that test cannot distinguish a default from a statement.
