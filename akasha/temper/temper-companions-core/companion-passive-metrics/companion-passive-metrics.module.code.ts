import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface CompanionPassiveMetricTemplate {
  id: string
  name: string
}

export const TEMPER_COMPANION_PASSIVE_METRICS = {
  "companion-ability-cooldown": { id: "companion-ability-cooldown", name: "Cooldowns" },
  "companion-armor": { id: "companion-armor", name: "Armor" },
  "companion-break-free-cooldown": { id: "companion-break-free-cooldown", name: "Break Free CD" },
  "companion-buff-duration": { id: "companion-buff-duration", name: "Buff Duration" },
  "companion-critical-chance": { id: "companion-critical-chance", name: "Crit Chance" },
  "companion-critical-damage": { id: "companion-critical-damage", name: "Crit Damage" },
  "companion-damage-blocked": { id: "companion-damage-blocked", name: "Damage Blocked" },
  "companion-damage-done": { id: "companion-damage-done", name: "Damage Done" },
  "companion-damage-taken": { id: "companion-damage-taken", name: "Damage Taken" },
  "companion-healing-done": { id: "companion-healing-done", name: "Healing Done" },
  "companion-healing-received": { id: "companion-healing-received", name: "Healing Received" },
  "companion-health-maximum": { id: "companion-health-maximum", name: "Max Health" },
  "companion-health-recovery": { id: "companion-health-recovery", name: "Health Recovery" },
  "companion-penetration": { id: "companion-penetration", name: "Penetration" },
  "companion-roll-dodge-cooldown": { id: "companion-roll-dodge-cooldown", name: "Roll Dodge CD" },
  "companion-ultimate-generation": { id: "companion-ultimate-generation", name: "Ultimate Gen" },
  "companion-weapon-damage": { id: "companion-weapon-damage", name: "Weapon Damage" },
} as const satisfies Record<string, CompanionPassiveMetricTemplate>

export const companionPassiveMetrics = createDataFile<CompanionPassiveMetricTemplate>()(
  TEMPER_COMPANION_PASSIVE_METRICS
)
