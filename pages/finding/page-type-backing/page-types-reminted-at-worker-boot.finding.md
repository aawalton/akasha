---
id: 6d66863f-4220-5e1b-805e-835efb685554
page-type-slug: finding
title: "Page types re-minted at worker boot"
domain-slug: domain/global
---

# Claim

41 of the 268 page types still backed by the database are re-created from code by `ensurePageTypes` when a worker boots, so hard-deleting the row does not retire the type. For these, retirement is a code change first and a database act second, and a row deleted before the code moves comes back on the next boot.

# Evidence

Read 2026-08-19 from `~/repos/code`. 20 files build a `PageTypeSpec` array or call `ensurePageTypes`. Taking every string literal in those files that matches a live page type slug gives 41: `author`, `authored-book`, `book`, `chess-game`, `chess-puzzle`, `chess-review-session`, `client-profile`, `coaching-constraint`, `collection`, `equipment-item`, `exercise`, `game`, `game-character`, `game-design`, `game-entity`, `game-lore`, `game-roll`, `game-state`, `game-turn`, `gbww-reading`, `gm-doctrine-pack`, `heard-track`, `idle-persona-card`, `mobility-reading`, `page-type`, `persona`, `property-definition`, `reading-story`, `schedule-day`, `selection-policy`, `set-log`, `song-listen`, `story`, `story-chapter`, `theme`, `tower-floor`, `tower-session`, `workout`, `workout-exercise`, `workout-schedule`, `workout-session`.

Eight stand in the tiers that read as free to delete — `chess-review-session`, `client-profile`, `gm-doctrine-pack`, `reading-story`, `selection-policy`, `story-chapter`, `workout`, `workout-exercise` — and each holds no live page, which is what makes them look finished. `chess-review-session` is the proved case: `packages/alanwalton/erin-chess-points/src/chess-review-session-page-type.ts` exports `ensureChessReviewSessionPageType`, and `erin-chess-points.worker.ts` imports it.

Holding no page has three causes that look identical from the database: nothing ever wrote to it, its writer cleans up after itself, or its writer is built and wired but never run. `scripture-book`, `scripture-chapter` and `scripture-volume` are the third — `open-scripture/sync-open-scripture.ts` walks volume to book to chapter and creates all three — as is `temper-build-version`, which has four readers in the Temper web app.

NOT MEASURED: whether any of these workers currently runs. I did not measure whether every `ensurePageTypes` call is reachable rather than dead code. Slug constants were resolved by matching literals within the same file, so a slug defined in one file and ensured from another is missed and the true count is at least 41 rather than exactly 41.
