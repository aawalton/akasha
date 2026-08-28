---
id: 8d6b57bb-b172-5fe0-83d0-d2b3f13514fa
slug: libhistoire-rename-blockers
page-type-slug: finding
title: "Libhistoire rename blockers"
domain-slug: domain/temper
---

# Claim

Renaming the LibHistoire library away from its upstream identity is not a mechanical rename: it has three separate open resolutions (a silently-breaking soft dependency from TamrielTradeCentre, unresolved licensing on ten shipped images, and five live SavedVariables keys holding Alan's real guild-history data that a rename would orphan without a migration), at least one of which needs Alan's decision.

# Evidence

From project #16190 (domain: temper). Carved out of batch #16188 on a pre-flight abort; the batch's other four rows proceeded clean.

BLOCKER 1 — TTC has a soft dependency on LibHistoire, missed by the original wave-split measurement. `TamrielTradeCentre.txt` line 6: `DependsOn: LibAddonMenu-2.0>=40 LibCustomMenu>=730`; line 8: `OptionalDependsOn: AwesomeGuildStore LibHistoire` — the dependency set is three, not two as assumed. Soft means TTC still loads, but its LibHistoire integration breaks silently. Confirmed live via the checklist's Step 0a instrument with a positive control. Root cause of the miss: a CRLF bug in the grep/sed extraction pipeline — stripping the version floor incidentally consumed trailing `\r` on tokens with a floor, but a floorless token (what an optional dependency looks like) kept its `\r` and silently failed to match.

BLOCKER 2 — ten shipped images, not four, and a folder-keyed texture path. Alan's provenance-gate commit recorded LibHistoire as dual-licensed (Artistic-2.0 code + CC-BY-SA-3.0 on four images); the real count is ten (`histoire.dds` plus nine `image/{histy,linked,unlinked}_{up,over,down}.dds`), all in `addon.json#assets`. Renaming code does not dissolve an image licence. `addon.json#description` also embeds the texture path `LibHistoire/histoire.dds`, keyed on the addon folder name.

BLOCKER 3 — five live SavedVariables keys hold Alan's guild-history data (`LibHistoire_{Settings,GuildNames,NameDictionary,GuildHistory,GuildHistoryCache}`). A rename orphans all five without a Step 7 migration: data-loss risk on Alan's own data.

REQUIRED ORDER: (1) settle licence status of all ten images — legal exposure, to Alan via ember if not compliant; (2) decide TTC soft-dependency handling — accept the silent break, or install upstream LibHistoire via `bun ops temper community-addon install "LibHistoire"` post-rename (settled already for LibAddonMenu-2.0/LibCustomMenu); (3) author Step 7 migration for all five keys first.
