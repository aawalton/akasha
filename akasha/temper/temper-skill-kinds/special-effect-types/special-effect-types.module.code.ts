import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface SpecialEffectTypeTemplate {
  id: string
  name: string
}

const SPECIAL_EFFECT_TYPE_DATA = {
  "block-all": { id: "block-all", name: "Block All" },
  "reflect-all": { id: "reflect-all", name: "Reflect Projectiles" },
  "heal-to-full": { id: "heal-to-full", name: "Full Heal" },
  "become-invisible": { id: "become-invisible", name: "Invisibility" },
  "dodge-next-attack": { id: "dodge-next-attack", name: "Dodge Next Attack" },
  "interrupt": { id: "interrupt", name: "Interrupt" },
  "ignore-resistance": { id: "ignore-resistance", name: "Ignore Resistance" },
  "pull-to-caster": { id: "pull-to-caster", name: "Pull to Caster" },
  "create-corpse": { id: "create-corpse", name: "Create Corpse" },
  "cleanse": { id: "cleanse", name: "Cleanse" },
} as const satisfies Record<string, SpecialEffectTypeTemplate>

export const specialEffectTypes =
  createDataFile<SpecialEffectTypeTemplate>()(SPECIAL_EFFECT_TYPE_DATA)
