---
id: c41ecdbd-ff67-5197-b851-91a0ff62ad0f
slug: libsets-39-unassigned-functions
page-type-slug: finding
title: "Libsets 39 unassigned functions"
domain-slug: domain/temper
---

# Claim

Following #16173's port of 8 range-owning modules from `LibSets.lua:3793-5225`, 39 of the 60 originally-unassigned public functions across that span still have no assignment in any `.d.ts` (measured against pinned oracle `4665f55d`, post-#16173), so the addon does not drop in at parity with upstream — a third-party addon calling one of the 39 (e.g. `LibSets.IsSetWithProc`) gets `nil` from this addon instead of a function.

# Evidence

From project #16212 (`temper`, `someday_maybe`, `live-on: deploy`), no objective — captured 2026-07-25, moved from retired `notes` 2026-08-15.

What #16173 established: 16 ghost members were the visible tip of a bigger hole — `LibSets.lua:3793-5225` (1433 lines) had never been ported; 46 of 48 public functions there had no assignment anywhere; the 16 were only ones our own code happened to call. #16173 ported those plus their delegation closure (8 new modules): 21 of 60 published functions in the span are now assigned, 39 remain.

Remaining gaps (measured against pinned oracle `4665f55d`, post-#16173):
`lua:3267-3349` (83 lines, predates #16173); `lua:3943-4084` (142, dungeon-zone id getters); `lua:4142-4242` (101, dungeon finder open/scroll); `lua:4285-4375` (91, zone id data); `lua:4394-4651` (258, set-item-collections, partially covered by `api-set-collection-zones.ts` — verify residue); `lua:4905-5225` (321, the entire set-procs API, largest unported block).

The 39: set-procs family (12, e.g. `GetAllSetDataWithProcAllowedInPvP`, `GetSetProcAbilityIds`, `IsSetWithProc`); dungeon-zone id getters (9, e.g. `GetDungeonZoneIdAchievementIds`, `GetDungeonZoneIdMotifId`); dungeon finder (2); zone data (2); set-item-collections residue (12, several possibly already assigned by `api-set-collection-zones.ts`, re-measure per-file first); plus `GetSetTypeSetsData`, `GetSupportedLanguageChoices`.

Why not urgent yet real: none of the 39 is declared in any `.d.ts` and none is referenced by our own code, so they cannot crash us and the unassigned-member check cannot fire without a declaration+read. But the library installs in place of upstream under upstream's name and version, so this is a drop-in-parity gap — size by which of the 39 external consumers plausibly call, set-procs most likely as documented public.

The dependencies/gotchas section carried forward from #16173 was cut at a paragraph boundary before stating its content.
