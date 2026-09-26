import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const combatAlertsTrialsA = {
  id: "01a0decb-f8d8-7154-b796-1cf3c0bb52fa",
  type: "page-type/domain",
  slug: "combat-alerts-trials-a",
  definition:
    "the combat alerts of Cloudrest, Asylum Sanctorium, Hel Ra, Sanctum Ophidia and Halls of Fabrication",
  parts: [
    "type-declaration/combat-alerts-trials-a-declarations",
    "module/combat-alerts-hel-ra-citadel",
    "module/combat-alerts-sanctum-ophidia",
    "module/combat-alerts-halls-of-fabrication",
  ],
} as const satisfies Domain
