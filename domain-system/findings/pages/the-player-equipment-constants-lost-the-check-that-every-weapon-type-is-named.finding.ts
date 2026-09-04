import type { Finding } from "../finding.page-type.ts"

export const thePlayerEquipmentConstantsLostTheCheckThatEveryWeaponTypeIsNamed = {
  id: "01a060ea-f373-7953-8057-8e2d88049f84",
  pageTypeSlug: "finding",
  slug: "the-player-equipment-constants-lost-the-check-that-every-weapon-type-is-named",
  domainSlug: "domain/temper",
  claim:
    "The player equipment constant table asserted that it named every weapon type and every armor weight, by satisfying a Record keyed on those two vocabularies. Neither vocabulary is in akasha, and an akasha file may import nothing outside the akasha folder, so the landed table keeps the literal values and drops the assertion. A weapon type added to the game would now go unnamed here and nothing would say so.",
  evidence:
    "temper/game-items-core/src/generated/temper-eso-player-equipment-constant.generated.ts line 29 reads `} as const satisfies Record<WeaponTypeId, number>` and line 38 reads `} as const satisfies Record<ArmorWeightId, number>`, taking WeaponTypeId from @temper/game-characters-equipment/weapons/weapon-types-data and ArmorWeightId from @temper/game-characters-equipment/armor/armor-weights-data. Both are derived from generated tables of their own, temper-weapon-type and temper-armor-weight. temper-equipment-kinds holds armor-types, which names armor slots by type rather than armor weights, and holds no weapon-types module at all, so neither union is reachable. akasha/temper/temper-items-core/eso-player-equipment-constants-data carries `as const` alone, which keeps the same literal value types and 13 weapon types and 5 armor weights. The third map, PLAYER_QUALITY_TO_ESO, keeps its `satisfies Record<string, number>` because that assertion never named a vocabulary. The companion table lost nothing: ESO_QUALITY_TO_COMPANION_QUALITY is typed on EquipmentQualityId from @akasha/temper-equipment-kinds/equipment-qualities, which is exactly the five values it holds. Restoring the two assertions is a two-line change once weapon types and armor weights land.",
} as const satisfies Finding
