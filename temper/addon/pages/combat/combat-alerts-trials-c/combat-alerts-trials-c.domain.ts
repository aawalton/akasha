import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const combatAlertsTrialsC = {
  id: "01a0debf-2111-767c-ad34-4ce4318137d6",
  type: "page-type/domain",
  slug: "combat-alerts-trials-c",
  definition: "the combat alerts of Maw of Lorkhaj, Lucent Citadel and Sanity's Edge",
  parts: [
    "module/combat-alerts-maw-pads",
    "module/combat-alerts-maw-twins",
    "module/combat-alerts-maw-of-lorkhaj",
    "module/combat-alerts-lucent-icons",
    "module/combat-alerts-lucent-citadel",
    "module/combat-alerts-sanity-chimera",
    "module/combat-alerts-sanity-ansuul",
    "module/combat-alerts-sanity-edge",
  ],
} as const satisfies Domain
