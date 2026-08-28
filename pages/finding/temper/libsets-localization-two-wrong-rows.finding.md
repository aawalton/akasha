---
id: 2a46429d-a4cc-5879-8ec8-4781093c2b2a
slug: libsets-localization-two-wrong-rows
page-type-slug: finding
title: "Libsets localization two wrong rows"
domain-slug: domain/temper
---

# Claim

In LibSets, two specific rows of the drop-zone localization table are wrong: `dropZoneOverland` is commented out in every language table including the English fallback, so `LIBSETS_SETTYPE_OVERLAND` tooltips resolve to `nil`; and `internal-textures-maps.ts:134` assigns Imperial City sets the Arena label instead of the Imperial City label. Every other localization table and lookup pattern in the addon was checked and found correct.

# Evidence

From project #16028 (domain `temper`, status `someday_maybe`, captured 2026-07-25, owned by ember, child of #15872 "Temper in-game readiness audit — find/fix/verify via Nimue's agent-control engine; Milestone-1 (GATED)"). Encountered by a constants/ reader, 2026-07-25, filed as its Finding 6.

Row 1: `dropZoneOverland` is defined in no language, including the English fallback. `internal-textures-maps.ts:136` reads `clientLocalization.dropZoneOverland`; the key is commented out in every language table (`internal-localization.ts:194` en, plus fr/pl/zh in `internal-localization-rest.ts`). English lacks the key too, so the fallback metatable resolves it to `nil`, baked in eagerly at load. Consumer: `tooltips/helpers.ts:241`. Impact: `LIBSETS_SETTYPE_OVERLAND`, the single largest set type in the game, passes `nil` into `getDungeonDifficultyStr` — an overloaded null, since the reader cannot distinguish "no drop-zone label" from "this set has no drop zone."

Row 2: Imperial City sets get the Arena label. `internal-textures-maps.ts:134` maps `LIBSETS_SETTYPE_IMPERIALCITY` to `clientLocalization.dropZoneArena`, four lines from `:140` which correctly maps the sibling `_MONSTER` type to `dropZoneImperialCity` — a key that exists and is used correctly one row down. So this is the wrong string, not a missing one. Unsettled: whether this is a port bug or a faithfully preserved upstream one; must be checked against `origin/PTS_New @ 4665f55d`, `LibSets.lua:2192-2210` before calling it a port defect.

Denominator: three lookup-miss patterns exist in the addon: nil-propagates (both rows above), empty-string (`lib-sets-autocompletion.ts:71-73`, guarded correctly on length), and raw-key fallback (`internal-textures.ts:148-151`, the correct pattern). All 8 language tables are otherwise complete; `jp` has no fallback by design and is unreachable as a client language. These two rows are the only defects found, not a systemic problem.
