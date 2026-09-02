import { targetArmor } from "@akasha/temper-character-sources/target-armors"
import type { SourceCategoryId } from "@akasha/temper-formula-framework/source-category"
import { getCompanionArmorBaseValue } from "../companion-armor-base-values/companion-armor-base-values.module.code.ts"
import { companionArmorSlots } from "../companion-armor-slots/companion-armor-slots.module.code.ts"
import { companionJewelrySlots } from "../companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import type { CompanionMetricEffect } from "../companion-metric-effect/companion-metric-effect.module.code.ts"
import { getCompanionPassiveEffects } from "../companion-passive-effects/companion-passive-effects.module.code.ts"
import {
  type CompanionSkillId,
  companionSkills,
} from "../companion-skills/companion-skills.module.code.ts"
import { getCompanionTraitMetricEffect } from "../companion-traits/companion-traits.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import {
  getCompanionShieldArmorValue,
  getCompanionWeaponBaseDamage,
  isCompanionWeaponShield,
} from "../companion-weapon-base-values/companion-weapon-base-values.module.code.ts"
import { companionWeaponSlots } from "../companion-weapon-slots/companion-weapon-slots.module.code.ts"
import { companionWeaponTypes } from "../companion-weapon-types/companion-weapon-types.module.code.ts"
import { companions } from "../companions/companions.module.code.ts"

export interface CompanionEffectSource {
  id: string
  categoryId: SourceCategoryId
  effects: readonly CompanionMetricEffect[]
}

export function extractArmorSources(build: CompanionState): readonly CompanionEffectSource[] {
  const sources: CompanionEffectSource[] = []

  for (const slotId of companionArmorSlots.ids) {
    const slot = build.equipment.armor[slotId]
    if (slot.itemType === "armor") {
      const effects: CompanionMetricEffect[] = []

      const baseArmorValue = getCompanionArmorBaseValue(slot.data.weight, slot.data.quality)
      effects.push({
        metricId: "companion-armor",
        effectType: "integer",
        effectValue: baseArmorValue,
      })

      const traitEffect = getCompanionTraitMetricEffect(slot.data.trait, slot.data.quality, false)
      if (traitEffect) {
        effects.push(traitEffect)
      }
      sources.push({
        id: `companion-armor-${slotId}`,
        categoryId: "companion-armor",
        effects,
      })
    }
  }

  return sources
}

export function extractJewelrySources(build: CompanionState): readonly CompanionEffectSource[] {
  const sources: CompanionEffectSource[] = []

  for (const slotId of companionJewelrySlots.ids) {
    const slot = build.equipment.jewelry[slotId]
    if (slot.itemType === "jewelry") {
      const effects: CompanionMetricEffect[] = []
      const traitEffect = getCompanionTraitMetricEffect(slot.data.trait, slot.data.quality, false)
      if (traitEffect) {
        effects.push(traitEffect)
      }
      sources.push({
        id: `companion-jewelry-${slotId}`,
        categoryId: "companion-jewelry",
        effects,
      })
    }
  }

  return sources
}

export function extractWeaponSources(build: CompanionState): readonly CompanionEffectSource[] {
  const sources: CompanionEffectSource[] = []

  for (const slotId of companionWeaponSlots.ids) {
    const slot = build.equipment.weapons[slotId]
    if (slot.itemType === "weapon" && slot.data.type !== "no-type") {
      const effects: CompanionMetricEffect[] = []

      if (isCompanionWeaponShield(slot.data.type)) {
        const shieldArmorValue = getCompanionShieldArmorValue(slot.data.quality)
        effects.push({
          metricId: "companion-armor",
          effectType: "integer",
          effectValue: shieldArmorValue,
        })
      } else {
        const fullWeaponDamage = getCompanionWeaponBaseDamage(slot.data.type, slot.data.quality)
        const weaponDamage =
          slotId === "off-hand"
            ? Math.round(fullWeaponDamage * OFF_HAND_WEAPON_DAMAGE_FRACTION)
            : fullWeaponDamage
        if (weaponDamage > 0) {
          effects.push({
            metricId: "companion-weapon-damage",
            effectType: "integer",
            effectValue: weaponDamage,
          })
        }
      }

      const weaponType = companionWeaponTypes.data[slot.data.type]
      const isTwoHanded = weaponType.isTwoHanded
      const traitEffect = getCompanionTraitMetricEffect(
        slot.data.trait,
        slot.data.quality,
        isTwoHanded
      )
      if (traitEffect) {
        effects.push(traitEffect)
      }
      sources.push({
        id: `companion-weapon-${slotId}`,
        categoryId: "companion-weapons",
        effects,
      })
    }
  }

  return sources
}

const OFF_HAND_WEAPON_DAMAGE_FRACTION = 0.1775

const ARMOR_WEIGHT_PASSIVE_MAP: Record<"light" | "medium" | "heavy", CompanionSkillId> = {
  heavy: "shared-firmness",
  light: "shared-flow",
  medium: "shared-flexibility",
}

function countArmorPieces(build: CompanionState): Record<"light" | "medium" | "heavy", number> {
  const counts: Record<"light" | "medium" | "heavy", number> = {
    light: 0,
    medium: 0,
    heavy: 0,
  }
  for (const slotId of companionArmorSlots.ids) {
    const slot = build.equipment.armor[slotId]
    if (slot.itemType === "armor" && slot.data.weight !== "no-weight") {
      counts[slot.data.weight]++
    }
  }
  return counts
}

export function extractSkillSources(build: CompanionState): readonly CompanionEffectSource[] {
  const sources: CompanionEffectSource[] = []

  const classPassiveId = companions.data[build.companion.id].classPassiveId
  if (classPassiveId != null) {
    const effects = getCompanionPassiveEffects(classPassiveId)
    sources.push({
      id: `companion-skill-${classPassiveId}`,
      categoryId: "companion-skills",
      effects,
    })
  }

  const pieceCounts = countArmorPieces(build)
  const weights = ["light", "medium", "heavy"] as const

  for (const weight of weights) {
    const count = pieceCounts[weight]
    if (count === 0) continue

    const passiveId = ARMOR_WEIGHT_PASSIVE_MAP[weight]
    const skill = companionSkills.data[passiveId]
    const effects: CompanionMetricEffect[] = []

    for (const effect of skill.effects) {
      if (effect.type === "armor-piece-scaling" && effect.armorWeight === weight) {
        effects.push({
          metricId: effect.metricId,
          effectType: "fractional-change",
          effectValue: effect.valuePerPiece * count,
        })
      }
    }

    if (effects.length > 0) {
      sources.push({
        id: `companion-skill-${passiveId}`,
        categoryId: "companion-skills",
        effects,
      })
    }
  }

  return sources
}

export function extractTargetSource(build: CompanionState): CompanionEffectSource {
  const armorValue = targetArmor.data[build.target.armor].armor

  return {
    id: "companion-target",
    categoryId: "companion-base",
    effects: [
      {
        metricId: "companion-target-armor",
        effectType: "integer",
        effectValue: armorValue,
      },
    ],
  }
}
