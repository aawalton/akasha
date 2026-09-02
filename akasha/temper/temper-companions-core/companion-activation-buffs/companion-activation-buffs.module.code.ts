import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface CompanionActivationBuffTemplate {
  id: string
  name: string
}

const COMPANION_ACTIVATION_BUFF_DATA = {
  "flat-resistance": { id: "flat-resistance" as const, name: "Resistance" },
  "flat-damage-reduction": { id: "flat-damage-reduction" as const, name: "Damage Taken" },
  "light-attack-damage": { id: "light-attack-damage" as const, name: "Light Attack Damage" },
  "heavy-attack-damage": { id: "heavy-attack-damage" as const, name: "Heavy Attack Damage" },
  "next-attack-damage": { id: "next-attack-damage" as const, name: "Next Attack Damage" },
  "health-recovery": { id: "health-recovery" as const, name: "Health Recovery" },
  "magicka-recovery": { id: "magicka-recovery" as const, name: "Magicka Recovery" },
  "stamina-recovery": { id: "stamina-recovery" as const, name: "Stamina Recovery" },
  "healing-received": { id: "healing-received" as const, name: "Healing Received" },
  "damage-taken-increase": { id: "damage-taken-increase" as const, name: "Damage Taken" },
} satisfies Record<string, CompanionActivationBuffTemplate>

export const companionActivationBuffs = createDataFile<CompanionActivationBuffTemplate>()(
  COMPANION_ACTIVATION_BUFF_DATA
)
