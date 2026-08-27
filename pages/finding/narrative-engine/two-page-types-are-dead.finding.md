---
id: d1b444f1-2555-51b9-96cf-e0ea0c0796d0
page-type-slug: finding
title: "Two page types are dead"
domain-slug: domain/narrative-engine
---

# Claim

Two of the narrative engine's ten page types are dead. `game-display-defaults` and `game-reveal-spec` each stand as a live row, a registry entry and an access module, and nothing in the repository reads or writes either. Their six exported access functions have zero callers between them, and the slugs appear nowhere but their own declarations. So two of the six authored types a file-backing migration would carry do not need carrying; they need removing.

# Evidence

Measured 2026-08-16 across `~/code/packages/`, excluding built output.

Six exported functions stand between the two access modules, and every one has zero callers outside the file declaring it: `readRevealSpec`, `readRevealSpecRow`, `writeRevealSpec`, `seedRevealSpecIfAbsent` in `packages/alanwalton/awen/src/awen/reveal-spec-access.ts`, and `readDisplayDefaults`, `readDisplayDefaultsRow`, `writeDisplayDefaults`, `seedDisplayDefaultsIfAbsent` in `display-defaults-access.ts`.

Because a caller could reach a page by its literal slug rather than through the constant, I searched the strings themselves over every `.ts` and `.tsx` in `packages/`. `game-display-defaults` returns three lines: its `DISPLAY_DEFAULTS_SLUG`, its `DISPLAY_DEFAULTS_EXTERNAL_ID`, and a `pluralSlug` in the registry at `src/awen/page-types.ts`. `game-reveal-spec` returns the same three shapes. No read, no write, no seed.

So the population is bounded and it is empty. Nothing selects on the type, nothing branches on its content, and the seeding path that would have created the rows has no caller either — yet a live row of each stands, so both were written once by something that no longer exists.

What makes this worth recording rather than merely tidying: `game-reveal-spec` is the allowlist of player-visible sheet keys. A reader meeting it in the registry would take it for the thing enforcing fog-of-war on a character sheet, and it enforces nothing. Whatever governs which sheet keys reach a player, it is not this. The same reading applies to `game-display-defaults`, which names itself the fallback for undeclared render dials and is consulted by nothing.

Their cost is not the rows. It is that a migration inventory counts ten page types where eight are load-bearing, and that a reader auditing what protects a player finds a name that answers.
