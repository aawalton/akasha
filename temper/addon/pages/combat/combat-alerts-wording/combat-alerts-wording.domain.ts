import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const combatAlertsWording = {
  id: "01a11c56-5f4d-7011-abc8-60c5c168914e",
  type: "page-type/domain",
  slug: "combat-alerts-wording",
  definition: "the words combat alerts shows, in each language the game offers",
  parts: [
    "module/combat-alerts-lang",
    "module/combat-alerts-lang-ids",
    "module/combat-alerts-lang-en-bosses",
    "module/combat-alerts-lang-en-lines",
    "module/combat-alerts-lang-de-bosses",
    "module/combat-alerts-lang-de-lines",
    "module/combat-alerts-lang-es-bosses",
    "module/combat-alerts-lang-es-lines",
    "module/combat-alerts-lang-fr-bosses",
    "module/combat-alerts-lang-fr-lines",
    "module/combat-alerts-lang-jp-bosses",
    "module/combat-alerts-lang-jp-lines",
    "module/combat-alerts-lang-ru-bosses",
    "module/combat-alerts-lang-ru-lines",
    "module/combat-alerts-lang-zh-bosses",
    "module/combat-alerts-lang-zh-lines",
    "module/combat-alerts-lang-pl-bosses",
  ],
  createdAt: "2026-10-08T16:26:24.972Z",
  updatedAt: "2026-10-08T16:26:24.972Z",
} as const satisfies Domain
