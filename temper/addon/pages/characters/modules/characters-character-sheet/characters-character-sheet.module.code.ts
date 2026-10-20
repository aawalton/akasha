import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"

export function characterSheet(stats: Record<string, number>): Record<string, number> {
  const [inventory, , stamina, , speed] = GetRidingStats()
  return {
    "attribute-points-health": GetAttributeSpentPoints(ATTRIBUTE_HEALTH),
    "attribute-points-magicka": GetAttributeSpentPoints(ATTRIBUTE_MAGICKA),
    "attribute-points-stamina": GetAttributeSpentPoints(ATTRIBUTE_STAMINA),
    "attribute-points-unspent": GetAttributeUnspentPoints(),
    "critical-chance-weapon": GetCriticalStrikeChance(stats["critical-rating-weapon"] ?? 0),
    "critical-chance-spell": GetCriticalStrikeChance(stats["critical-rating-spell"] ?? 0),
    "riding-speed": speed,
    "riding-stamina": stamina,
    "riding-capacity": inventory,
  }
}
