---
id: 014645d1-dd07-5129-8fcc-d0af6c1730d4
slug: catalog-completion-gate-key-presence
page-type-slug: finding
title: "Catalog completion gate key presence"
domain-slug: domain/temper
---

# Claim

TemperCatalog's collection-completeness gate treats key presence as completion rather than checking the value written, so a batched collector whose pre-enumeration returns empty writes a truthy-but-empty value (`{}` or `{ categories: {} }`) that permanently satisfies the gate — and because the catalog collector's trigger unregisters itself after firing once, that key is never revisited in the session.

# Evidence

Project #16075, domain `temper`, filed as the TemperCatalog-side twin of #15947 (the completion-addon analogue). Carried no objective; notes only.

THE GATE: `packages/temper/catalog/addon/src/main.ts:97-102` treats `savedVars[domain.key] === undefined` as "pending" — presence-only, so a partial or empty value is never revisited. Same basis at `main.ts:151,166` and `catalog/host/src/saved-variables-reader.ts:79`, `catalog/cli/.../status.ts:62`.

WHY NOT FIXABLE IN THE COLLECTOR: unlike the completion addon (re-runs each `EVENT_PLAYER_ACTIVATED`, so #15947 could merge), the catalog collector's `autoCollect` trigger unregisters itself after first fire (`main.ts:230`) — a key is never revisited once written.

EXPOSURE: `packages/temper/shared/capture/core/src/run-batched.ts:25-38` fires `onComplete()` even when `items.length===0`, so an empty pre-enumeration writes `{}`, satisfying the gate permanently. Affects five batched subjects: achievements, item-sets, collectibles, companion-skills, skills (active domains). `traitResearchCatalog` itself is low-impact — its payload is dropped by `scripts/src/watcher/import-catalog.ts:85,165`, and the completion denominator comes from a static artifact, not user capture.

RETRACTION ON RECORD: the author's earlier premise "no ESO rig exists" was false and had suppressed a cheap check — SavedVariables files are written by the live game and are genuine (async) in-game observation, even though an agent cannot drive the game directly.

CALIBRATION: `TemperCatalog.lua` (14,722,065 bytes, 2026-07-25) measured with `completed=true`; 21 domain keys enumerated by line-span (e.g. traitResearchCatalog 1579, collectiblesCatalog 65558) — full table in the retired project row's history.

The capture broke off at a paragraph boundary before a conclusion beyond the measurement.
