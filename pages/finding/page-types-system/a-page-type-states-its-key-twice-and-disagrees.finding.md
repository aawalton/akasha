---
page-type-slug: finding
title: "A page type states its key twice and disagrees"
domain-slug: domain/page-types-system
---

# Claim

`idle-persona-card` states a two-part key in prose and a one-part key in the field that runs, so each of its 41 addresses names three distinct pages.

# Evidence

Measured 2026-08-28 on `main` at a clean working tree.

`pages/page-type/idle-persona-card.page-type.md`, 25 lines. Line 8 `named-for: "{card-slug}"`; line 9 `owner-slug: player-id`; line 21, a Design line, "A card belongs to one player, and several players hold a card for one persona."

The mechanism is general: a page type carries its key twice, once as prose in Design and once as a pattern in `named-for`, and only the second is machine-read.

Three folders under `pages/idle-persona-card/` — `4ee54543-cb30-4f47-a8d0-9269b4b7df76`, `9ba554f7-cb18-48bb-a709-ec935a895ca7`, `e62e5a30-9879-40dd-be89-27b17f89ddd5` — each holding 41 files: 41 distinct names, each appearing 3 times. 123 pages over 41 addresses.

Nothing refuses it. `bun run tools/run-checks.ts pages-named-as-stated` exits 0 and reports `advisory`: `23439 of 23442 covered page(s) carry the name their file does, across 109 convention(s), over 59024 page(s)`. Its per-item list shows 12 `idle-persona-card` entries and "and 34 more"; whether the 34 are all this type I did not establish.

Not measured: what a lookup by one of the 41 addresses returns, or whether any code reads a card by address.

Widened across every page type: six carry both `owner-slug` and `named-for`, and five do not name their owner in `named-for` — `character-build` (owner `account-page`, named `{slug}`), `companion-build` (`account-page`, `{slug}`), `idle-persona-card` (`player-id`, `{card-slug}`), `temper-companion-progress` (`account-page`, `{companion-id}`), `temper-inventory-chunk` (`account-page`, `{inventory}-{chunk-index}`). The sixth, `temper-account`, names its owner.

Only `idle-persona-card` collides today: 123 pages over 41 addresses, 82 beyond the first. `character-build` 14 over 14, `companion-build` 6 over 6, `temper-companion-progress` 8 over 8, `temper-inventory-chunk` 455 over 455. One wrong, four latent — safe by the accident that no two owners have yet held a page with the same name.
