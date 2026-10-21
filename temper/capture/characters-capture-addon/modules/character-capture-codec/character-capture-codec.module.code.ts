import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-03/eso-enums-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import { requireAt } from "akasha/code/type/narrowing/modules/require-at/require-at.module.code.ts"
import { getAllianceIndex } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-alliance-map/character-capture-alliance-map.module.code.ts"
import { getBaseAbilityId } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-base-ability/character-capture-base-ability.module.code.ts"
import { getChampionPointIndex } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-champion-point-map/character-capture-champion-point-map.module.code.ts"
import { getClassIndex } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-class-map/character-capture-class-map.module.code.ts"
import { CHARACTER_PASSIVE_RANK_BITS } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-codec-constants/character-capture-codec-constants.module.code.ts"
import type {
  CharacterArmorSlotData,
  CharacterBuildData,
  CharacterCPDisciplineData,
  CharacterJewelrySlotData,
  CharacterWeaponBarData,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-codec-types/character-capture-codec-types.module.code.ts"
import {
  getCurseIndex,
  getVampireStageIndex,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-curse-map/character-capture-curse-map.module.code.ts"
import {
  captureCharacterArmorSlot,
  captureCharacterJewelrySlot,
  captureCharacterWeaponSlot,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-equipment/character-capture-equipment.module.code.ts"
import { getFoodIndex } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-food-map/character-capture-food-map.module.code.ts"
import {
  classMasteryCount,
  classMasteryPlace,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-mastery-map/character-capture-mastery-map.module.code.ts"
import { getMundusIndex } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-mundus-map/character-capture-mundus-map.module.code.ts"
import {
  characterPassiveSkillCount,
  getPassiveBitmaskIndex,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-passive-map/character-capture-passive-map.module.code.ts"
import {
  getPotionIndex,
  parsePotionData,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-potion-map/character-capture-potion-map.module.code.ts"
import { getRaceIndex } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-race-map/character-capture-race-map.module.code.ts"
import { getScribedSkillPlace } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-scribed-skill-map/character-capture-scribed-skill-map.module.code.ts"
import { captureScribingData } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-scribing/character-capture-scribing.module.code.ts"
import { getPlayerSkillLineIndex } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-line-map/character-capture-skill-line-map.module.code.ts"
import {
  getPlayerSkillIndex,
  skillIndexOfPlace,
} from "akasha/temper/capture/characters-capture-addon/modules/character-capture-skill-map/character-capture-skill-map.module.code.ts"

const CHARACTER_ARMOR_SLOTS = [
  EQUIP_SLOT_HEAD,
  EQUIP_SLOT_SHOULDERS,
  EQUIP_SLOT_CHEST,
  EQUIP_SLOT_HAND,
  EQUIP_SLOT_WAIST,
  EQUIP_SLOT_LEGS,
  EQUIP_SLOT_FEET,
]

const CHARACTER_JEWELRY_SLOTS = [EQUIP_SLOT_NECK, EQUIP_SLOT_RING1, EQUIP_SLOT_RING2]

const CHARACTER_WEAPON_BARS: [number, number][] = [
  [EQUIP_SLOT_MAIN_HAND, EQUIP_SLOT_OFF_HAND],
  [EQUIP_SLOT_BACKUP_MAIN, EQUIP_SLOT_BACKUP_OFF],
]

const CHARACTER_SKILL_SLOT_INDICES = [3, 4, 5, 6, 7, 8]

const CHARACTER_CP_SLOT_INDICES: number[][] = [
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [1, 2, 3, 4],
]

const CHARACTER_DISCIPLINE_INDICES = [2, 3, 1]

function slottedSkillIndex(slotIndex: number, hotbarCategory: number): number {
  const boundId = GetSlotBoundId(slotIndex, hotbarCategory)
  if (GetSlotType(slotIndex, hotbarCategory) !== ACTION_TYPE_CRAFTED_ABILITY) {
    return getPlayerSkillIndex(getBaseAbilityId(boundId))
  }
  const [focusScriptId] = GetCraftedAbilityActiveScriptIds(boundId)
  if (focusScriptId === 0) return 0
  return skillIndexOfPlace(
    getScribedSkillPlace(
      GetCraftedAbilityDisplayName(boundId),
      GetCraftedAbilityScriptDisplayName(focusScriptId)
    )
  )
}

const PASSIVE_RANKS_TRIED = 10

function passiveBitmaskIndex(
  skillType: SkillType,
  lineIndex: number,
  skillIndex: number
): number | undefined {
  const current = GetSkillAbilityId(skillType, lineIndex, skillIndex, false)
  const held = getPassiveBitmaskIndex(getBaseAbilityId(current))
  if (held !== undefined) return held
  for (let rank = 1; rank <= PASSIVE_RANKS_TRIED; rank++) {
    const [abilityId] = GetSpecificSkillAbilityInfo(skillType, lineIndex, skillIndex, 0, rank)
    if (abilityId === 0) return undefined
    const ranked = getPassiveBitmaskIndex(abilityId)
    if (ranked !== undefined) return ranked
  }
  return undefined
}

const HIGHEST_PASSIVE_RANK = 2 ** CHARACTER_PASSIVE_RANK_BITS - 1

function passiveRank(skillType: SkillType, lineIndex: number, skillIndex: number): number {
  const [currentUpgradeLevel] = GetSkillAbilityUpgradeInfo(skillType, lineIndex, skillIndex)
  if (currentUpgradeLevel === undefined) return 0
  return Math.min(currentUpgradeLevel, HIGHEST_PASSIVE_RANK)
}

export function captureCharacterBuild(): CharacterBuildData {
  const classIndex = getClassIndex(GetUnitClassId("player"))
  const raceIndex = getRaceIndex(GetUnitRaceId("player"))
  const allianceIndex = getAllianceIndex(GetUnitAlliance("player"))

  const magicka = GetAttributeSpentPoints(ATTRIBUTE_MAGICKA)
  const health = GetAttributeSpentPoints(ATTRIBUTE_HEALTH)
  const stamina = GetAttributeSpentPoints(ATTRIBUTE_STAMINA)

  const curseType = GetPlayerCurseType()
  let curseState = "no-curse"
  if (curseType === CURSE_TYPE_VAMPIRE) {
    curseState = "vampire"
  } else if (curseType === CURSE_TYPE_WEREWOLF) {
    curseState = "werewolf"
  }
  const curseIndex = getCurseIndex(curseState)

  let mundusIndex = 0
  let vampireStageIndex = 0
  let foodIndex = 0
  const numBuffs = GetNumBuffs("player")
  for (let i = 1; i <= numBuffs; i++) {
    const [, , , , , , , , abilityType, , abilityId, canClickOff] = GetUnitBuffInfo("player", i)

    const mIndex = getMundusIndex(abilityId)
    if (mIndex !== 0) {
      mundusIndex = mIndex
    }

    if (curseState === "vampire") {
      const vsIndex = getVampireStageIndex(abilityId)
      if (vsIndex !== 0) {
        vampireStageIndex = vsIndex
      }
    }

    if (abilityType === ABILITY_TYPE_BONUS && canClickOff === true) {
      const fIndex = getFoodIndex(abilityId)
      if (fIndex !== 0) {
        foodIndex = fIndex
      }
    }
  }

  const skillLineIndices: number[] = []
  const numClassLines = GetNumSkillLines(SKILL_TYPE_CLASS)
  for (let lineIndex = 1; lineIndex <= numClassLines; lineIndex++) {
    const skillLineData = SKILLS_DATA_MANAGER.GetSkillLineDataByIndices(SKILL_TYPE_CLASS, lineIndex)
    if (skillLineData?.IsActive()) {
      const [, , , skillLineId] = GetSkillLineInfo(SKILL_TYPE_CLASS, lineIndex)
      if (skillLineId !== undefined && skillLineId !== 0) {
        const slIndex = getPlayerSkillLineIndex(skillLineId)
        if (slIndex !== 0) {
          skillLineIndices.push(slIndex)
        }
      }
    }
  }

  const armor: CharacterArmorSlotData[] = []
  for (const slot of CHARACTER_ARMOR_SLOTS) {
    armor.push(captureCharacterArmorSlot(slot))
  }

  const jewelry: CharacterJewelrySlotData[] = []
  for (const slot of CHARACTER_JEWELRY_SLOTS) {
    jewelry.push(captureCharacterJewelrySlot(slot))
  }

  const weaponBars: CharacterWeaponBarData[] = []
  for (const [mainSlot, offSlot] of CHARACTER_WEAPON_BARS) {
    weaponBars.push({
      mainHand: captureCharacterWeaponSlot(mainSlot),
      offHand: captureCharacterWeaponSlot(offSlot),
    })
  }

  const primarySkills: number[] = []
  const backupSkills: number[] = []
  for (const slotIndex of CHARACTER_SKILL_SLOT_INDICES) {
    primarySkills.push(slottedSkillIndex(slotIndex, HOTBAR_CATEGORY_PRIMARY))
    backupSkills.push(slottedSkillIndex(slotIndex, HOTBAR_CATEGORY_BACKUP))
  }

  const passiveBitmask: boolean[] = []
  const passiveRanks: number[] = []
  const passiveCount = characterPassiveSkillCount()
  for (let i = 0; i < passiveCount; i++) {
    passiveBitmask.push(false)
    passiveRanks.push(0)
  }
  const masteryBitmask: boolean[] = []
  for (let i = 0; i < classMasteryCount(); i++) masteryBitmask.push(false)
  const passiveSkillTypes = [
    SKILL_TYPE_CLASS,
    SKILL_TYPE_WEAPON,
    SKILL_TYPE_ARMOR,
    SKILL_TYPE_WORLD,
    SKILL_TYPE_GUILD,
    SKILL_TYPE_AVA,
    SKILL_TYPE_RACIAL,
    SKILL_TYPE_TRADESKILL,
  ]
  for (const skillType of passiveSkillTypes) {
    const numLines = GetNumSkillLines(skillType)
    for (let lineIndex = 1; lineIndex <= numLines; lineIndex++) {
      const numAbilities = GetNumSkillAbilities(skillType, lineIndex)
      for (let skillIndex = 1; skillIndex <= numAbilities; skillIndex++) {
        if (!IsSkillAbilityPassive(skillType, lineIndex, skillIndex)) continue
        if (!IsSkillAbilityPurchased(skillType, lineIndex, skillIndex)) continue
        const mastery = classMasteryPlace(
          GetSkillAbilityId(skillType, lineIndex, skillIndex, false)
        )
        if (mastery !== undefined) masteryBitmask[mastery] = true
        const bitmaskIndex = passiveBitmaskIndex(skillType, lineIndex, skillIndex)
        if (bitmaskIndex !== undefined) {
          passiveBitmask[bitmaskIndex] = true
          passiveRanks[bitmaskIndex] = passiveRank(skillType, lineIndex, skillIndex)
        }
      }
    }
  }

  const championPoints: CharacterCPDisciplineData[] = []
  for (const [d, disciplineIndex] of CHARACTER_DISCIPLINE_INDICES.entries()) {
    const slotted: number[] = []
    const cpSlots = requireAt(CHARACTER_CP_SLOT_INDICES, d, "CHARACTER_CP_SLOT_INDICES")
    for (const slotIndex of cpSlots) {
      const abilityId = GetSlotBoundId(slotIndex, HOTBAR_CATEGORY_CHAMPION)
      if (abilityId > 0) {
        slotted.push(getChampionPointIndex(abilityId))
      } else {
        slotted.push(0)
      }
    }

    const passive: number[] = []
    const numSkills = GetNumChampionDisciplineSkills(disciplineIndex)
    for (let skillIndex = 1; skillIndex <= numSkills; skillIndex++) {
      const skillId = GetChampionSkillId(disciplineIndex, skillIndex)
      const pointsSpent = GetNumPointsSpentOnChampionSkill(skillId)
      if (pointsSpent > 0) {
        const cpIndex = getChampionPointIndex(skillId)
        if (cpIndex >= 0) {
          passive.push(cpIndex)
        }
      }
    }

    championPoints.push({ slotted, passive })
  }

  let potionIndex = 0
  let potion2Index = 0
  let potionsFound = 0
  for (let slot = 1; slot <= ACTION_BAR_UTILITY_BAR_SIZE; slot++) {
    if (GetSlotType(slot, HOTBAR_CATEGORY_QUICKSLOT_WHEEL) !== ACTION_TYPE_ITEM) continue
    const link = GetSlotItemLink(slot, HOTBAR_CATEGORY_QUICKSLOT_WHEEL)
    if (link === "") continue
    const [itemType] = GetItemLinkItemType(link)
    if (itemType !== ITEMTYPE_POTION) continue
    const itemId = GetItemLinkItemId(link)
    const encodedTraits = parsePotionData(link)
    const idx = getPotionIndex(itemId, encodedTraits)
    if (potionsFound === 0) {
      potionIndex = idx
      potionsFound = 1
    } else {
      potion2Index = idx
      break
    }
  }

  const scribing = captureScribingData()

  const esoPlusBit = IsESOPlusSubscriber() ? 1 : 0

  return {
    classIndex,
    raceIndex,
    allianceIndex,
    roleBitmask: 0,
    vampireStageIndex,
    curseIndex,
    mundusIndex,
    magicka,
    health,
    stamina,
    skillLineIndices,
    armor,
    jewelry,
    weaponBars,
    primarySkills,
    backupSkills,
    passiveBitmask,
    passiveRanks,
    championPoints,
    foodIndex,
    potionIndex,
    potion2Index,
    targetArmorBit: 0,
    targetHealth: 100,
    scribing,
    esoPlusBit,
    masteryBitmask,
  }
}
