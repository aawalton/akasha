---
id: 83d09bab-70cd-59a7-b027-f0f63a09107b
page-type-slug: finding
title: "Wandering Inn rulings stand in deployed code"
domain-slug: domain/narrative-engine
---

# Claim

Two deployed TypeScript files hold nothing but hand-made judgments about one story, against this domain's line that no deployed code names one story or one world.

# Evidence

Measured 2026-08-19, while tracing where a class page's `aliases` come from.

`packages/alanwalton/awen/ingest/src/class-skill-ruled-aliases.ts` is 194 lines holding `RULED_ALIASES`, 135 entries mapping a written variant to a canonical slug and kind — 119 class, 12 skill, 4 spell. Each is a judgment somebody made about The Wandering Inn: `Acolytes` is the plural of `acolyte`, `CruSAdeR` and `Crusaders` are both `crusader`, `Commander.` with the full stop is `commander`. `deriveCatalog` in `class-skill-catalog.ts` reads it through `aliasesFor(kind, slug)` and it is the only source of the `aliases` field on every class, skill and spell row.

`packages/alanwalton/awen/ingest/src/twi-alias-map.ts` is 86 lines holding `TWI_ALIAS_MAP`, 38 character identities: `halrac-the-grim` and `halrac` are `halrac-everam`, `ceria` is `ceria-springwalker`. Some are chapter-scoped, so `goblins` resolves to `rags-band` at chapter 28 and `goblin-mob-ch43` at 43. `loadAliasMap` returns it whenever no explicit path is given, which is the default path.

Both are content rather than code. Nothing in either file computes: they are tables a reader of the books filled in, and a new reading of a chapter changes them. Each change is a deploy.

The corpus now has somewhere for both. `world-mechanic-aliases` holds the first on the class, skill and spell pages it describes, and `character` became a page type on this date, which is where the second belongs.

Not measured: whether any other deployed file under `awen/ingest` holds story judgments of the same kind. Eleven files matched a grep for Wandering Inn names, and nine of them are tests.
