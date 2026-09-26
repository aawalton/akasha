import {
  type CompanionBaseRoleId,
  type CompanionBaseRoleTemplate,
  companionBaseRoles,
  getArmorWeightForBaseRoles,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import { getDefaultUltimateForCompanion } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-queries/companion-skill-queries.module.code.ts"
import type { CompanionTraitId } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import { companionWeaponRoleAt } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-roles/companion-weapon-roles.module.code.ts"
import {
  type CompanionWeaponTypeId,
  isTwoHandedWeapon,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"
import { companions } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { buildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { randomFrom } from "akasha/temper/player/character/formula-framework/modules/random-from/random-from.module.code.ts"

const NO_TRAIT: CompanionTraitId = "no-trait"

const NO_WEAPON: CompanionWeaponTypeId = "no-type"

function pickableBaseRoles(): CompanionBaseRoleId[] {
  return companionBaseRoles()
    .filter((role) => role.defaultTraitId !== null)
    .map((role) => role.id)
}

function rolesOf(ids: readonly CompanionBaseRoleId[]): readonly CompanionBaseRoleTemplate[] {
  return companionBaseRoles().filter((role) => ids.includes(role.id))
}

function getDefaultArmorTraitForBaseRoles(roles: readonly CompanionBaseRoleId[]): CompanionTraitId {
  const role = rolesOf(roles).find((one) => one.defaultTraitId !== null)
  return (role?.defaultTraitId ?? NO_TRAIT) as CompanionTraitId
}

function weaponsFromPairing(pairingId: string): {
  mainHand: CompanionWeaponTypeId
  offHand: CompanionWeaponTypeId
} {
  const pairing = companionWeaponRoleAt(pairingId)
  const off = pairing.validOffHandWeaponTypes
  return {
    mainHand: randomFrom([...pairing.validMainHandWeaponTypes]) as CompanionWeaponTypeId,
    offHand: (off.length === 0 ? NO_WEAPON : randomFrom([...off])) as CompanionWeaponTypeId,
  }
}

function getDefaultWeaponsForBaseRoles(roles: readonly CompanionBaseRoleId[]): {
  mainHand: CompanionWeaponTypeId
  offHand: CompanionWeaponTypeId
} {
  const chosen = rolesOf(roles)
  const outright = chosen.find((role) => role.defaultMainHand !== null)
  if (outright !== undefined) {
    return {
      mainHand: outright.defaultMainHand as CompanionWeaponTypeId,
      offHand: (outright.defaultOffHand ?? NO_WEAPON) as CompanionWeaponTypeId,
    }
  }
  const picking = chosen.find((role) => role.defaultWeaponRoleIds.length > 0)
  if (picking !== undefined)
    return weaponsFromPairing(randomFrom([...picking.defaultWeaponRoleIds]))
  return { mainHand: NO_WEAPON, offHand: NO_WEAPON }
}

function createEmptyEquipment(): CompanionState["equipment"] {
  return {
    armor: {
      head: { itemType: "empty", data: null },
      shoulders: { itemType: "empty", data: null },
      chest: { itemType: "empty", data: null },
      hands: { itemType: "empty", data: null },
      waist: { itemType: "empty", data: null },
      legs: { itemType: "empty", data: null },
      feet: { itemType: "empty", data: null },
    },
    jewelry: {
      necklace: { itemType: "empty", data: null },
      "ring-1": { itemType: "empty", data: null },
      "ring-2": { itemType: "empty", data: null },
    },
    weapons: {
      "main-hand": { itemType: "empty", data: null },
      "off-hand": { itemType: "empty", data: null },
    },
  }
}

export function createEquipmentForBaseRoles(
  roles: readonly CompanionBaseRoleId[]
): CompanionState["equipment"] {
  if (roles.length === 0) {
    return createEmptyEquipment()
  }

  const armorTrait = getDefaultArmorTraitForBaseRoles(roles)
  const armorWeight = getArmorWeightForBaseRoles(roles)
  const weapons = getDefaultWeaponsForBaseRoles(roles)

  return {
    armor: {
      head: {
        itemType: "armor",
        data: { type: "head", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
      shoulders: {
        itemType: "armor",
        data: { type: "shoulders", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
      chest: {
        itemType: "armor",
        data: { type: "chest", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
      hands: {
        itemType: "armor",
        data: { type: "hands", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
      waist: {
        itemType: "armor",
        data: { type: "waist", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
      legs: {
        itemType: "armor",
        data: { type: "legs", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
      feet: {
        itemType: "armor",
        data: { type: "feet", weight: armorWeight, trait: armorTrait, quality: "epic" },
      },
    },
    jewelry: {
      necklace: {
        itemType: "jewelry",
        data: { type: "necklace", trait: armorTrait, quality: "epic" },
      },
      "ring-1": {
        itemType: "jewelry",
        data: { type: "ring-1", trait: armorTrait, quality: "epic" },
      },
      "ring-2": {
        itemType: "jewelry",
        data: { type: "ring-2", trait: armorTrait, quality: "epic" },
      },
    },
    weapons: {
      "main-hand": {
        itemType: "weapon",
        data: { slot: "main-hand", type: weapons.mainHand, trait: armorTrait, quality: "epic" },
      },
      "off-hand": {
        itemType: "weapon",
        data: { slot: "off-hand", type: weapons.offHand, trait: armorTrait, quality: "epic" },
      },
    },
  }
}

export function equipmentMatchesBaseRoleDefaults(
  equipment: CompanionState["equipment"],
  roles: readonly CompanionBaseRoleId[]
): boolean {
  if (roles.length === 0) {
    for (const slot of Object.values(equipment.armor)) {
      if (slot.itemType !== "empty") return false
    }
    for (const slot of Object.values(equipment.jewelry)) {
      if (slot.itemType !== "empty") return false
    }
    for (const slot of Object.values(equipment.weapons)) {
      if (slot.itemType !== "empty") return false
    }
    return true
  }

  const expectedTrait = getDefaultArmorTraitForBaseRoles(roles)
  const expectedWeight = getArmorWeightForBaseRoles(roles)
  const expectedQuality = "epic"

  for (const slot of Object.values(equipment.armor)) {
    if (slot.itemType !== "armor") return false
    if (slot.data.trait !== expectedTrait) return false
    if (slot.data.weight !== expectedWeight) return false
    if (slot.data.quality !== expectedQuality) return false
  }

  for (const slot of Object.values(equipment.jewelry)) {
    if (slot.itemType !== "jewelry") return false
    if (slot.data.trait !== expectedTrait) return false
    if (slot.data.quality !== expectedQuality) return false
  }

  const mainHandSlot = equipment.weapons["main-hand"]
  const mainHandType = mainHandSlot.itemType === "weapon" ? mainHandSlot.data.type : "no-type"
  const isMainHandTwoHanded = mainHandType !== "no-type" && isTwoHandedWeapon(mainHandType)

  if (mainHandSlot.itemType !== "weapon") return false
  if (mainHandSlot.data.trait !== expectedTrait) return false
  if (mainHandSlot.data.quality !== expectedQuality) return false

  if (!isMainHandTwoHanded) {
    const offHandSlot = equipment.weapons["off-hand"]
    if (offHandSlot.itemType !== "weapon") return false
    if (offHandSlot.data.trait !== expectedTrait) return false
    if (offHandSlot.data.quality !== expectedQuality) return false
  }

  return true
}

export const createNewCompanion = (): CompanionState => {
  const randomCompanion = randomFrom(companions().ids.filter((id) => id !== "no-companion"))
  const randomRole = randomFrom(pickableBaseRoles())
  const equipment = createEquipmentForBaseRoles([randomRole])
  const defaultUltimate = getDefaultUltimateForCompanion(randomCompanion)

  return {
    id: buildId(""),
    name: "",
    description: "",

    companion: {
      id: randomCompanion,
      baseRoles: [randomRole],
    },
    equipment,
    skills: {
      "skill-bar": {
        "active-1": "no-skill",
        "active-2": "no-skill",
        "active-3": "no-skill",
        "active-4": "no-skill",
        "active-5": "no-skill",
        ultimate: defaultUltimate,
      },
    },
    target: {
      armor: "dungeon",
      targetCount: 1,
      targetHealth: "full",
    },
  }
}

export const createEmptyCompanion = (): CompanionState => ({
  id: buildId(""),
  name: "",
  description: "",
  companion: {
    id: "no-companion",
    baseRoles: [],
  },
  equipment: {
    armor: {
      head: {
        itemType: "armor",
        data: { type: "head", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
      shoulders: {
        itemType: "armor",
        data: { type: "shoulders", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
      chest: {
        itemType: "armor",
        data: { type: "chest", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
      hands: {
        itemType: "armor",
        data: { type: "hands", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
      waist: {
        itemType: "armor",
        data: { type: "waist", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
      legs: {
        itemType: "armor",
        data: { type: "legs", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
      feet: {
        itemType: "armor",
        data: { type: "feet", weight: "no-weight", trait: "no-trait", quality: "epic" },
      },
    },
    jewelry: {
      necklace: {
        itemType: "jewelry",
        data: { type: "necklace", trait: "no-trait", quality: "epic" },
      },
      "ring-1": {
        itemType: "jewelry",
        data: { type: "ring-1", trait: "no-trait", quality: "epic" },
      },
      "ring-2": {
        itemType: "jewelry",
        data: { type: "ring-2", trait: "no-trait", quality: "epic" },
      },
    },
    weapons: {
      "main-hand": {
        itemType: "weapon",
        data: { slot: "main-hand", type: "no-type", trait: "no-trait", quality: "epic" },
      },
      "off-hand": {
        itemType: "weapon",
        data: { slot: "off-hand", type: "no-type", trait: "no-trait", quality: "epic" },
      },
    },
  },
  skills: {
    "skill-bar": {
      "active-1": "no-skill",
      "active-2": "no-skill",
      "active-3": "no-skill",
      "active-4": "no-skill",
      "active-5": "no-skill",
      ultimate: "no-skill",
    },
  },
  target: {
    armor: "dungeon",
    targetCount: 1,
    targetHealth: "full",
  },
})
