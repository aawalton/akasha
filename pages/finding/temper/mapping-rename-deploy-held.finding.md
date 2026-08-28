---
id: 0fbb3dab-be5f-5a21-93b0-2b77a198056f
slug: mapping-rename-deploy-held
page-type-slug: finding
title: "Mapping rename deploy held"
domain-slug: domain/temper
---

# Claim

The rename of four Temper community-library ports (LibMainMenu-2.0, LibMapData, LibMapPing, LibMapPins-1.0 -> TemperPinRegistry) was completed and locally verified in commit `5eb8e95996e1097f43aaee10d3cb0ab511643395` (154 files, +1434/-1775), with LibHistoire carved out to #16190 as an unmanaged soft dependency carrying live guild-history SavedVariables, and deploy was held fleet-wide pending a dispatcher defect fix.

# Evidence

Project #16188, domain `temper`, status `someday_maybe`, no objective; moved off retired `notes` 2026-08-15.

Scope carve-out (ember, ratified) 2026-07-25T14:23: LibHistoire removed from #16188, split to #16190 — pre-flight found it an unmanaged soft dependency of TamrielTradeCentre (`OptionalDependsOn`, breaks silently), plus 10 CC-BY-SA-3.0 assets and 5 live SavedVariables keys of Alan's real guild-history data. #16188 now covers four libraries: LibMainMenu-2.0, LibMapData, LibMapPing, LibMapPins-1.0 -> TemperMainMenu / TemperMapData / TemperMapPing / TemperPinRegistry.

Naming precedent: LibMapPins-1.0 could not take TemperMapPins — that is the retired identity of the folded Map Pins addon, still owning four live SavedVariables globals on TemperNavigation. Chose TemperPinRegistry; reuse would have corrupted saved data. Name-freedom re-run against the live estate (50 AddOns dirs, 166 SV files, content): all four free.

Committed, held before CI, 2026-07-25T14:43: commit 5eb8e95996e1097f43aaee10d3cb0ab511643395, 154 files, +1434/-1775. Not checked or deployed — ember instructed a fleet-wide hold (dispatcher head-of-line-blocking defect, athena fixing).

Four renames, one commit (ESO hard-gates DependsOn): LibMainMenu-2.0 (global renamed); LibMapData (+_Internal, 53 constants renamed, SV migration); LibMapPing (global renamed, legacy global deleted, consumer repointed); LibMapPins-1.0 -> TemperPinRegistry (global + 8 constants). 8 consumer edges updated, version floors dropped.

Pre-deploy verification all green: fingerprint-residue, dependency-floor (37/37, 111 edges), dependency-cycle, global-ownership, held-addon-structure, full build (49/49), sandbox-safety, colon-dot-self-shift, 30 unit tests.

Absence verified per file, never by presence of the new name: zero old-token survivors on the runtime surface; 65 total repo-wide, classified as check-input data or historical records. Guard: TemperMapPins entries grew 59->62, inside reason strings.
