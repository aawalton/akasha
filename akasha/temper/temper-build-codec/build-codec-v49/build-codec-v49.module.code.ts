import {
  type BitReaderState,
  makeBitReader,
  readBits,
} from "@akasha/temper-build-hash/build-hash-bit-reader"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { ScribedSkill } from "@akasha/temper-character-skills/scribed-skill-types"
import type { RoleId } from "@akasha/temper-character-sources/character-roles"
import type { TargetArmorId } from "@akasha/temper-character-sources/target-armors"
import { buildId } from "@akasha/temper-formula-framework/branded-id"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import {
  AFFIX_SCRIPT_BITS,
  ALLIANCE_BITS,
  ATTRIBUTE_BITS,
  CLASS_BITS,
  CURSE_BITS,
  ESO_PLUS_BITS,
  FOCUS_SCRIPT_BITS,
  FOOD_OR_DRINK_BITS,
  GRIMOIRE_BITS,
  getAffixScriptId,
  getAllianceId,
  getClassId,
  getCurseId,
  getEsoPlusId,
  getFocusScriptId,
  getFoodOrDrinkId,
  getGrimoireId,
  getMundusId,
  getPotionId,
  getRaceId,
  getScribedSkillId,
  getSignatureScriptId,
  getSkillLineId,
  getVampireStageId,
  MUNDUS_BITS,
  POTION_BITS,
  RACE_BITS,
  SCRIBED_SKILL_BITS,
  SIGNATURE_SCRIPT_BITS,
  SKILL_LINE_BITS,
  VAMPIRE_STAGE_BITS,
} from "../build-codec-indices/build-codec-indices.module.code.ts"
import { decodeChampionPoints } from "../build-codec-v49-champion-points/build-codec-v49-champion-points.module.code.ts"
import { decodeEquipment } from "../build-codec-v49-equipment/build-codec-v49-equipment.module.code.ts"
import {
  decodePassives,
  decodeSkills,
} from "../build-codec-v49-skills/build-codec-v49-skills.module.code.ts"

export const ESO_VERSION_49 = 49

const ROLE_BITMASK_BITS = 8

const BITMASK_TO_ROLE: [number, Exclude<RoleId, "no-role">][] = [
  [1 << 0, "dps"],
  [1 << 1, "dps"],
  [1 << 2, "tank"],
  [1 << 3, "healer"],
  [1 << 4, "pvp"],
  [1 << 5, "solo"],
]

function bitmaskToRoleIds(bitmask: number): readonly RoleId[] {
  const result: RoleId[] = []
  for (const [mask, roleId] of BITMASK_TO_ROLE) {
    if ((bitmask & mask) !== 0 && !result.includes(roleId)) result.push(roleId)
  }
  return result
}

const SKILL_LINE_COUNT_BITS = 4

const SCRIBING_COUNT_BITS = 4

export function decodeV49(data: Uint8Array): CharacterState | null {
  try {
    const reader = makeBitReader(data)

    readBits(reader, 8)
    readBits(reader, 8)
    const minorVersion = readBits(reader, 8)

    return decodeBody(reader, minorVersion)
  } catch {
    return null
  }
}

function decodeBody(reader: BitReaderState, minorVersion: number): CharacterState {
  const character = decodeCharacter(reader, minorVersion)

  const equipment = decodeEquipment(reader)

  const skills = decodeSkills(reader)

  const passives = decodePassives(reader)

  const championPoints = decodeChampionPoints(reader)

  const consumables = decodeConsumables(reader, minorVersion)

  const target = decodeTarget(reader)

  const scribing = decodeScribing(reader)

  const account = decodeAccount(reader)

  return {
    id: buildId(""),
    name: "",
    description: "",
    character: {
      name: "",
      ...character,
    },
    equipment,
    skills,
    passives,
    scribing,
    championPoints,
    consumables,
    target,
    account,
  }
}

function decodeCharacter(
  reader: BitReaderState,
  minorVersion: number
): Omit<CharacterState["character"], "name"> {
  const classId = getClassId(readBits(reader, CLASS_BITS))
  const raceId = getRaceId(readBits(reader, RACE_BITS))
  const allianceId =
    minorVersion >= 5 ? getAllianceId(readBits(reader, ALLIANCE_BITS)) : "no-alliance"
  const roleIds = minorVersion < 6 ? bitmaskToRoleIds(readBits(reader, ROLE_BITMASK_BITS)) : []
  const vampireStageId = getVampireStageId(readBits(reader, VAMPIRE_STAGE_BITS))
  const curseState = getCurseId(readBits(reader, CURSE_BITS))
  const mundusId = getMundusId(readBits(reader, MUNDUS_BITS))
  const magicka = readBits(reader, ATTRIBUTE_BITS)
  const health = readBits(reader, ATTRIBUTE_BITS)
  const stamina = readBits(reader, ATTRIBUTE_BITS)

  const skillLineCount = readBits(reader, SKILL_LINE_COUNT_BITS)
  const skillLineIds: SkillLineId[] = []
  for (let i = 0; i < skillLineCount; i++) {
    skillLineIds.push(getSkillLineId(readBits(reader, SKILL_LINE_BITS)))
  }

  return {
    class: classId,
    race: raceId,
    alliance: allianceId,
    roles: roleIds,
    vampireStage: vampireStageId,
    curseState,
    mundusStone: mundusId,
    attributes: { magicka, health, stamina },
    skillLineIds,
  }
}

function decodeConsumables(
  reader: BitReaderState,
  minorVersion: number
): CharacterState["consumables"] {
  const foodOrDrink = getFoodOrDrinkId(readBits(reader, FOOD_OR_DRINK_BITS))
  const potion = getPotionId(readBits(reader, POTION_BITS))
  const potion2 = minorVersion >= 7 ? getPotionId(readBits(reader, POTION_BITS)) : "no-potion"

  return { foodOrDrink, potion, potion2 }
}

function decodeTarget(reader: BitReaderState): CharacterState["target"] {
  const armorBit = readBits(reader, 1)
  const armor: TargetArmorId = armorBit === 1 ? "overland" : "dungeon"
  const health = readBits(reader, 7) / 100

  return { armor, health, targetCount: 1 }
}

function decodeScribing(reader: BitReaderState): readonly ScribedSkill[] {
  const count = readBits(reader, SCRIBING_COUNT_BITS)
  const scribing: ScribedSkill[] = []

  for (let i = 0; i < count; i++) {
    const skillId = getScribedSkillId(readBits(reader, SCRIBED_SKILL_BITS))
    const grimoireId = getGrimoireId(readBits(reader, GRIMOIRE_BITS))
    const focusScriptId = getFocusScriptId(readBits(reader, FOCUS_SCRIPT_BITS))
    const signatureScriptId = getSignatureScriptId(readBits(reader, SIGNATURE_SCRIPT_BITS))
    const affixScriptId = getAffixScriptId(readBits(reader, AFFIX_SCRIPT_BITS))

    scribing.push({
      skillId,
      grimoireId,
      focusScriptId,
      signatureScriptId,
      affixScriptId,
    })
  }

  return scribing
}

function decodeAccount(reader: BitReaderState): CharacterState["account"] {
  const esoPlus = getEsoPlusId(readBits(reader, ESO_PLUS_BITS))
  return { esoPlus }
}
