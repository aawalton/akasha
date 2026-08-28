---
id: 2f61f0f9-5a7e-5f82-aceb-fb2a9598015f
slug: libsets-equipslot-nondeterministic
page-type-slug: finding
title: "Libsets equipslot nondeterministic"
domain-slug: domain/temper
---

# Claim

In LibSets' search UI, the EquipSlot and armorOrWeaponType columns (`searchui/list-build.ts:127-129,240-247`) are both derived from one arbitrary, hash-order-selected representative item (`GetSetFirstItemId`, `set-itemids-filtered.ts:143`), so the displayed slot and type for a multi-slot set can differ non-deterministically between sessions with no underlying data change.

# Evidence

Project #15995 (domain `temper`). Carried no objective — captured but never defined; moved off the row's retired `notes` attribute on 2026-08-15.

Origin: found by #15986's worker beyond its brief (nimue relaying), HEAD `636a6805b5`. Same species/root cause as #15986 (SAMPLE-AS-WHOLE fed by an arbitrary representative), different rendered path, not covered by any existing project.

The defect: the EquipSlot column is fed from `list-build.ts:127 -> :244 itemData.equipSlot`, one arbitrary representative piece, shown as if it characterized the whole set.

Why worse than merely arbitrary: the representative is resolved by `GetSetFirstItemId` through the first key yielded by Lua `pairs()` over the set's itemId table (`set-itemids-filtered.ts:143`) — hash order. The displayed slot is non-deterministic across sessions: the same set can show a different slot on different logins with no data change.

Follow-up (nimue): verified this does NOT fall out of #15986 for free. #15986's fix lands in the tooltip difficulty path (`drop-mechanic-render.ts` -> new `veteran-breakdown.ts`); EquipSlot is a separate path: `list-build.ts:127 GetItemLinkEquipType -> :128 getEquipSlotTexture -> :244-247`.

Scope broadened: a second column, `armorOrWeaponType`/`Text`/`Texture` at `list-build.ts:240-242`, same `itemLink`, same defect — one of two slots at random for a monster set, one of twelve for a 12-slot set.

Distinction from #15986: the difficulty label had a truthful per-piece decomposition, so it could be repaired directly. EquipSlot/armorOrWeaponType may have no meaningful set-level answer at all — apply an Existence Check first; the honest fix might be dropping the column rather than a better representative.

Territory: `list-build.ts` also touched by #15987 (`:158-164`) and possibly #15986 (`:113/:120`); not for concurrent dispatch with either.

Evidence grade: source-reasoned. Nobody had counted how many sets span multiple equip slots (presumed nearly all, uncounted).
