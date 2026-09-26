import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const combatAlertsSettings = {
  id: "01a0deab-42dc-7fe0-9dba-abc73f8f0888",
  type: "page-type/domain",
  slug: "combat-alerts-settings",
  definition: "the options a player sets for the combat alerts",
  parts: [
    "type-declaration/combat-alerts-settings-declarations",
    "module/combat-alerts-settings-state",
    "module/combat-alerts-settings-unlock",
    "module/combat-alerts-settings-general",
    "module/combat-alerts-settings-boss-bar",
    "module/combat-alerts-settings-individual",
    "module/combat-alerts-settings-group-icons",
    "module/combat-alerts-settings-world-icons",
    "module/combat-alerts-settings-misc",
  ],
} as const satisfies Domain
