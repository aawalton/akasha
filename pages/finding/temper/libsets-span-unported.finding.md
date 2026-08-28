---
id: fb1382fc-157d-5b1f-b608-280ec906edf2
slug: libsets-span-unported
page-type-slug: finding
title: "Libsets span unported"
domain-slug: domain/temper
---

# Claim

LibSets.lua:3793-5225 (1433 upstream lines, 46 of 48 public functions) was never ported into the Temper add-on at all — the 16 declared-but-unassigned "ghost" functions originally found were only the subset the add-on's own code happened to call and therefore crash on, not the extent of the gap; work to port and gate the remainder was stopped mid-flight by Alan with code pushed but CI never run.

# Evidence

Filed as #16173, domain `temper`, status `someday_maybe`.

**Bundle-confirmed.** Detector over the bundle counts assignments (`lib.X =`/`LibSets.X =`) per member; control `GetAllDropZones` -> assign=1 confirms it works. 16 members, assign=0 refs>=1: GetCurrentZoneIds, GetCurrentZoneName, GetDLCName, GetDungeonFinderDataFromChildNodes, GetDungeonZoneIdParentZoneId, GetPublicDungeonZoneIdParentZoneId, GetSpecialZoneNameById (fixed #16155), GetZoneName, IsDungeonZoneId, IsDungeonZoneIdTrial, IsPublicDungeonZoneId, OpenDungeonFinder, OpenSetItemCollectionBookForItemLink, OpenSetItemCollectionBrowserForCurrentZone, RegisterCustomTooltipHook, getNumEquippedItemsByItemIds.

**Why nothing caught it.** A `.d.ts` declaration is an assertion, not evidence — call sites type-check clean. `addon-sandbox-load` proves a bundle loads, not that `InitializeFilters` ran (needs `EVENT_ADD_ON_LOADED`, never fired by the sandbox — why #16155 reached live client).

**Call sites:** `api-drop-zones-sets.ts:85`, `tooltips/drop-mechanic-collect.ts:204-225`, `tooltips/helpers.ts:307`, `searchui/keyboard-ui.ts:184`, `core/set-checking.ts:258`, `core/lifecycle-ui-buttons.ts:184,187`, `core/lifecycle-inventory-contextmenu.ts:93`, `searchui/shared-contextmenu.ts:24,29,33`, `debug/debug-names.ts:38,39`

**Scope, why the check can't land first.** A post-emit check for a declared `lib.*` member with no bundle assignment would fail on remaining ghosts immediately. Port upstream first (Baertram @ 4665f55d, 0.9.2/9020), then land the check — landing first needs a suppression allowlist. #16155 fixed 1 of 16.

**WIP stop** (2026-07-25T16:25): paused by Alan, code pushed but CI never ran (NOT VERIFIED). Branch `project-16173`, worktree `~/projects/16173/worktree` (clean), 3 commits: b58d473245 (7 ports+gate+docs), 05cf1b635b (8th port), 61f2e97639 (unrelated fix).

**Scope correction:** filed as "15 ghosts + check," but LibSets.lua:3793-5225 (1433 lines, 46 of 48 functions) never ported — the 16 ghosts were only what the addon called and crashed on; ~30 more silently absent.
