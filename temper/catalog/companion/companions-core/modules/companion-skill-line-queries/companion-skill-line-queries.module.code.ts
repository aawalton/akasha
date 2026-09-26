import { companionArmorSlots } from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-slots/companion-armor-slots.module.code.ts"
import {
  type CompanionArmorWeight,
  companionArmorWeightAt,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-weights/companion-armor-weights.module.code.ts"
import {
  type CompanionSkillLineId,
  companionSkillLineAt,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import { companionWeaponRoles } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-roles/companion-weapon-roles.module.code.ts"
import { combatMechanics } from "akasha/temper/catalog/companion/companions-core/modules/rotation-types/rotation-types.module.code.ts"

function weaponSkillLineOf(mainType: string | null, offType: string): CompanionSkillLineId | null {
  if (mainType === null) return null
  for (const role of companionWeaponRoles()) {
    if (!role.validMainHandWeaponTypes.includes(mainType)) continue
    const off = role.validOffHandWeaponTypes
    if (off.length === 0 || off.includes(offType)) return role.weaponSkillLineId
  }
  return null
}

function getAvailableCompanionSkillLines(
  equipment: CompanionState["equipment"]
): Set<CompanionSkillLineId> {
  const available = new Set<CompanionSkillLineId>()

  const mainHand = equipment.weapons["main-hand"]
  const offHand = equipment.weapons["off-hand"]
  const mainHandType = mainHand.itemType === "weapon" ? mainHand.data.type : null
  const offHandType = offHand.itemType === "weapon" ? offHand.data.type : "no-type"
  const weaponLine = weaponSkillLineOf(mainHandType, offHandType)
  if (weaponLine !== null) available.add(weaponLine)

  const weightCounts = new Map<CompanionArmorWeight, number>()
  for (const slot of companionArmorSlots.list) {
    const armorSlot = equipment.armor[slot.id]
    if (armorSlot.itemType === "armor" && armorSlot.data.weight !== "no-weight") {
      const weight = armorSlot.data.weight
      weightCounts.set(weight, (weightCounts.get(weight) ?? 0) + 1)
    }
  }

  for (const [weight, count] of weightCounts) {
    const line = companionArmorWeightAt(weight).skillLineId
    if (line !== null && count >= combatMechanics().armorLinePieces) available.add(line)
  }

  return available
}

export function isCompanionSkillAvailable(
  skill: { skillLineId: CompanionSkillLineId },
  equipment: CompanionState["equipment"]
): boolean {
  const skillLine = companionSkillLineAt(skill.skillLineId)
  const category = skillLine.category

  if (category === "class" || category === "guild") {
    return true
  }

  const availableSkillLines = getAvailableCompanionSkillLines(equipment)
  return availableSkillLines.has(skill.skillLineId)
}
