import { companionArmorSlots } from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-slots/companion-armor-slots.module.code.ts"
import { getValidTraitIdsForBaseRoles } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import { companionSkillAt } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import {
  type CompanionEquipmentQualityId,
  companionEquipmentQualities,
  companionEquipmentQualityName,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import {
  availableQualityOptions,
  legendaryQualityOptions,
  slotAllowsLegendary,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-quality-rules/companion-equipment-quality-rules.module.code.ts"
import { companionJewelrySlots } from "akasha/temper/catalog/companion/companions-core/modules/companion-jewelry-slots/companion-jewelry-slots.module.code.ts"
import { evaluate } from "akasha/temper/catalog/companion/companions-core/modules/companion-optimizer/companion-optimizer.module.code.ts"
import {
  type CompanionSkillSlotId,
  companionSkillSlots,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-slots/companion-skill-slots.module.code.ts"
import { companionTraitAt } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import { getValidSkillIds } from "akasha/temper/catalog/companion/companions-core/modules/companion-valid-skills/companion-valid-skills.module.code.ts"
import { companionWeaponSlots } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-slots/companion-weapon-slots.module.code.ts"

export interface CompanionSuggestion {
  type: "trait" | "quality" | "skill"
  slot: string
  from: string
  to: string
  improvement: number
  mutation:
    | { kind: "equipment"; updates: Partial<CompanionState["equipment"]> }
    | { kind: "skills"; updates: CompanionState["skills"] }
}

function getQualitiesAbove(
  current: CompanionEquipmentQualityId,
  includeLegendary: boolean
): readonly CompanionEquipmentQualityId[] {
  const inHashPlace = companionEquipmentQualities().map((quality) => quality.id)
  const rank = inHashPlace.indexOf(current)
  const options = includeLegendary ? legendaryQualityOptions() : availableQualityOptions()
  return options.map((quality) => quality.id).filter((id) => inHashPlace.indexOf(id) > rank)
}

const MAX_SUGGESTIONS = 10
const ULTIMATE_SLOT: CompanionSkillSlotId = "ultimate"

export function generateSuggestions(state: CompanionState): readonly CompanionSuggestion[] {
  if (state.companion.baseRoles.length === 0) return []

  const baseScore = evaluate(state)
  const suggestions: CompanionSuggestion[] = []

  const validTraitIds = getValidTraitIdsForBaseRoles(state.companion.baseRoles)

  for (const slotId of companionArmorSlots.ids) {
    const slot = state.equipment.armor[slotId]
    if (slot.itemType !== "armor") continue
    const currentTrait = slot.data.trait
    const slotName = companionArmorSlots.data[slotId].name

    for (const traitId of validTraitIds) {
      if (traitId === currentTrait) continue
      const newArmor = {
        ...state.equipment.armor,
        [slotId]: { ...slot, data: { ...slot.data, trait: traitId } },
      }
      const newState = { ...state, equipment: { ...state.equipment, armor: newArmor } }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "trait",
          slot: slotName,
          from: companionTraitAt(currentTrait).name,
          to: companionTraitAt(traitId).name,
          improvement: score - baseScore,
          mutation: { kind: "equipment", updates: { armor: newArmor } },
        })
      }
    }
  }

  for (const slotId of companionJewelrySlots.ids) {
    const slot = state.equipment.jewelry[slotId]
    if (slot.itemType !== "jewelry") continue
    const currentTrait = slot.data.trait
    const slotName = companionJewelrySlots.data[slotId].name

    for (const traitId of validTraitIds) {
      if (traitId === currentTrait) continue
      const newJewelry = {
        ...state.equipment.jewelry,
        [slotId]: { ...slot, data: { ...slot.data, trait: traitId } },
      }
      const newState = { ...state, equipment: { ...state.equipment, jewelry: newJewelry } }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "trait",
          slot: slotName,
          from: companionTraitAt(currentTrait).name,
          to: companionTraitAt(traitId).name,
          improvement: score - baseScore,
          mutation: { kind: "equipment", updates: { jewelry: newJewelry } },
        })
      }
    }
  }

  for (const slotId of companionWeaponSlots.ids) {
    const slot = state.equipment.weapons[slotId]
    if (slot.itemType !== "weapon") continue
    const currentTrait = slot.data.trait
    const slotName = companionWeaponSlots.data[slotId].name

    for (const traitId of validTraitIds) {
      if (traitId === currentTrait) continue
      const newWeapons = {
        ...state.equipment.weapons,
        [slotId]: { ...slot, data: { ...slot.data, trait: traitId } },
      }
      const newState = { ...state, equipment: { ...state.equipment, weapons: newWeapons } }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "trait",
          slot: slotName,
          from: companionTraitAt(currentTrait).name,
          to: companionTraitAt(traitId).name,
          improvement: score - baseScore,
          mutation: { kind: "equipment", updates: { weapons: newWeapons } },
        })
      }
    }
  }

  for (const slotId of companionArmorSlots.ids) {
    const slot = state.equipment.armor[slotId]
    if (slot.itemType !== "armor") continue
    const currentQuality = slot.data.quality
    const slotName = companionArmorSlots.data[slotId].name

    for (const qualityId of getQualitiesAbove(currentQuality, false)) {
      const newArmor = {
        ...state.equipment.armor,
        [slotId]: { ...slot, data: { ...slot.data, quality: qualityId } },
      }
      const newState = { ...state, equipment: { ...state.equipment, armor: newArmor } }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "quality",
          slot: slotName,
          from: companionEquipmentQualityName(currentQuality),
          to: companionEquipmentQualityName(qualityId),
          improvement: score - baseScore,
          mutation: { kind: "equipment", updates: { armor: newArmor } },
        })
      }
    }
  }

  for (const slotId of companionJewelrySlots.ids) {
    const slot = state.equipment.jewelry[slotId]
    if (slot.itemType !== "jewelry") continue
    const currentQuality = slot.data.quality
    const slotName = companionJewelrySlots.data[slotId].name

    for (const qualityId of getQualitiesAbove(currentQuality, slotAllowsLegendary(slotId))) {
      const newJewelry = {
        ...state.equipment.jewelry,
        [slotId]: { ...slot, data: { ...slot.data, quality: qualityId } },
      }
      const newState = { ...state, equipment: { ...state.equipment, jewelry: newJewelry } }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "quality",
          slot: slotName,
          from: companionEquipmentQualityName(currentQuality),
          to: companionEquipmentQualityName(qualityId),
          improvement: score - baseScore,
          mutation: { kind: "equipment", updates: { jewelry: newJewelry } },
        })
      }
    }
  }

  for (const slotId of companionWeaponSlots.ids) {
    const slot = state.equipment.weapons[slotId]
    if (slot.itemType !== "weapon") continue
    const currentQuality = slot.data.quality
    const slotName = companionWeaponSlots.data[slotId].name

    for (const qualityId of getQualitiesAbove(currentQuality, false)) {
      const newWeapons = {
        ...state.equipment.weapons,
        [slotId]: { ...slot, data: { ...slot.data, quality: qualityId } },
      }
      const newState = { ...state, equipment: { ...state.equipment, weapons: newWeapons } }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "quality",
          slot: slotName,
          from: companionEquipmentQualityName(currentQuality),
          to: companionEquipmentQualityName(qualityId),
          improvement: score - baseScore,
          mutation: { kind: "equipment", updates: { weapons: newWeapons } },
        })
      }
    }
  }

  const allValidSkills = getValidSkillIds(state)

  for (const slotId of companionSkillSlots.ids.filter((id) => id !== ULTIMATE_SLOT)) {
    const currentSkillId = state.skills["skill-bar"][slotId]
    const slotName = companionSkillSlots.data[slotId].name

    for (const skillId of allValidSkills) {
      if (skillId === currentSkillId) continue

      const newSkillBar = { ...state.skills["skill-bar"], [slotId]: skillId }
      const newSkills = { ...state.skills, "skill-bar": newSkillBar }
      const newState = { ...state, skills: newSkills }
      const score = evaluate(newState)
      if (score > baseScore) {
        suggestions.push({
          type: "skill",
          slot: slotName,
          from: companionSkillAt(currentSkillId).name,
          to: companionSkillAt(skillId).name,
          improvement: score - baseScore,
          mutation: { kind: "skills", updates: newSkills },
        })
      }
    }
  }

  suggestions.sort((a, b) => b.improvement - a.improvement)
  return suggestions.slice(0, MAX_SUGGESTIONS)
}
