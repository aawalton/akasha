import { expect, test } from "bun:test"
import {
  base64urlToBytes,
  bytesToBase64url,
} from "akasha/temper/build-hash/build-hash-base64url/build-hash-base64url.module.code.ts"
import type { CharacterState } from "akasha/temper/character-build/build-types/build-types.module.code.ts"
import type {
  ArmorSlotItem,
  JewelrySlotItem,
  WeaponSlotItem,
} from "akasha/temper/characters-equipment/loadout-types/loadout-types.module.code.ts"
import type { StandardArmorType } from "../../equipment-kinds/armor-types/armor-types.module.code.ts"
import { buildHash, buildId } from "../../formula-framework/branded-id/branded-id.module.code.ts"
import {
  getAffixScriptId,
  getAllianceId,
  getArmorEnchantId,
  getArmorTraitId,
  getArmorWeightId,
  getChampionPointId,
  getClassId,
  getCurseId,
  getEsoPlusId,
  getFocusScriptId,
  getFoodOrDrinkId,
  getGrimoireId,
  getJewelryEnchantId,
  getJewelryTraitId,
  getMundusId,
  getPassiveSkillId,
  getPoisonId,
  getPotionId,
  getQualityId,
  getRaceId,
  getScribedSkillId,
  getSetId,
  getSignatureScriptId,
  getSkillId,
  getSkillLineId,
  getVampireStageId,
  getWeaponEnchantId,
  getWeaponTraitId,
  getWeaponTypeId,
} from "../build-codec-indices/build-codec-indices.module.code.ts"
import { ESO_VERSION_52, encodeV52 } from "../build-codec-v52/build-codec-v52.module.code.ts"
import { decodeBuild, ESO_VERSION_48, encodeBuild } from "./build-codec.module.code.ts"

const CHARACTER_BUILD_TYPE = 1

const CODEC_MINOR_VERSION = 7

const RECORDED = [
  "ATQHgAAAAABgAAD__AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK9evXHyJMqXMmzp9CjSp1KtZatWrR54-gQokaRKmTqFKpWsKFChQoAAggYQKGDiBIoWMGjh5AiSJgAAMgA",
  "ATQHgAAAAAAf_4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABXr164BatWrQBQoUKAAAAGQAA",
]

function armorPiece(type: StandardArmorType, seed: number): ArmorSlotItem {
  return {
    itemType: "armor",
    data: {
      type,
      weight: getArmorWeightId(1 + (seed % 3)),
      trait: getArmorTraitId(1 + (seed % 5)),
      enchantment: getArmorEnchantId(1 + (seed % 4)),
      set: getSetId(40 + seed),
      quality: getQualityId(1 + (seed % 5)),
      enchantmentQuality: "fine",
    },
  }
}

function jewelryPiece(type: "necklace" | "ring", seed: number): JewelrySlotItem {
  return {
    itemType: "jewelry",
    data: {
      type,
      trait: getJewelryTraitId(1 + (seed % 5)),
      enchantment: getJewelryEnchantId(1 + (seed % 5)),
      set: getSetId(90 + seed),
      quality: getQualityId(1 + (seed % 5)),
      enchantmentQuality: "superior",
    },
  }
}

function weaponPiece(seed: number): WeaponSlotItem {
  return {
    itemType: "weapon",
    data: {
      type: getWeaponTypeId(seed % 6),
      trait: getWeaponTraitId(1 + (seed % 5)),
      enchantment: getWeaponEnchantId(1 + (seed % 5)),
      poison: getPoisonId(0),
      set: getSetId(120 + seed),
      quality: getQualityId(1 + (seed % 5)),
      enchantmentQuality: "epic",
    },
  }
}

function shieldPiece(seed: number): WeaponSlotItem {
  return {
    itemType: "shield",
    data: {
      type: "shield",
      weight: "shield",
      trait: getArmorTraitId(1 + (seed % 5)),
      enchantment: getArmorEnchantId(1 + (seed % 4)),
      set: getSetId(150 + seed),
      quality: getQualityId(4),
      enchantmentQuality: "legendary",
    },
  }
}

function representativeBuild(): CharacterState {
  return {
    id: buildId(""),
    name: "",
    description: "",
    character: {
      name: "",
      roles: [],
      class: getClassId(3),
      race: getRaceId(6),
      alliance: getAllianceId(2),
      skillLineIds: [getSkillLineId(1), getSkillLineId(9), getSkillLineId(17)],
      attributes: { magicka: 64, health: 0, stamina: 40 },
      curseState: getCurseId(1),
      vampireStage: getVampireStageId(3),
      mundusStone: getMundusId(5),
    },
    equipment: {
      armor: {
        head: armorPiece("head", 0),
        shoulders: armorPiece("shoulders", 1),
        chest: armorPiece("chest", 2),
        hands: armorPiece("hands", 3),
        waist: armorPiece("waist", 4),
        legs: armorPiece("legs", 5),
        feet: armorPiece("feet", 6),
      },
      jewelry: {
        necklace: jewelryPiece("necklace", 0),
        "ring-1": jewelryPiece("ring", 1),
        "ring-2": jewelryPiece("ring", 2),
      },
      "primary-weapon-bar": { "main-hand": weaponPiece(1), "off-hand": weaponPiece(2) },
      "backup-weapon-bar": { "main-hand": weaponPiece(3), "off-hand": shieldPiece(4) },
    },
    skills: {
      "primary-skill-bar": {
        "active-1": getSkillId(100),
        "active-2": getSkillId(107),
        "active-3": getSkillId(114),
        "active-4": getSkillId(121),
        "active-5": getSkillId(128),
        ultimate: getSkillId(135),
      },
      "backup-skill-bar": {
        "active-1": getSkillId(300),
        "active-2": getSkillId(311),
        "active-3": getSkillId(322),
        "active-4": getSkillId(333),
        "active-5": getSkillId(344),
        ultimate: getSkillId(355),
      },
    },
    passives: [0, 5, 17, 100, 445].map(getPassiveSkillId),
    scribing: [
      {
        skillId: getScribedSkillId(2),
        grimoireId: getGrimoireId(1),
        focusScriptId: getFocusScriptId(3),
        signatureScriptId: getSignatureScriptId(4),
        affixScriptId: getAffixScriptId(5),
      },
    ],
    championPoints: {
      warfare: {
        slotted: [1, 2, 3, 4].map(getChampionPointId),
        passive: [5, 6, 7].map(getChampionPointId),
      },
      fitness: {
        slotted: [8, 9, 10, 11].map(getChampionPointId),
        passive: [12, 13].map(getChampionPointId),
      },
      craft: {
        slotted: [14, 15, 16, 17].map(getChampionPointId),
        passive: [18].map(getChampionPointId),
      },
    },
    consumables: {
      foodOrDrink: getFoodOrDrinkId(4),
      potion: getPotionId(7),
      potion2: getPotionId(9),
    },
    target: { armor: "overland", health: 0.35, targetCount: 1 },
    account: { esoPlus: getEsoPlusId(1) },
  }
}

function stampedWith(bytes: Uint8Array, version: number): string {
  const held = new Uint8Array(bytes)
  held[1] = version
  return bytesToBase64url(held)
}

test("every recorded build hash is a character build written by update fifty-two", () => {
  for (const hash of RECORDED) {
    const bytes = base64urlToBytes(hash)
    expect(bytes).not.toBeNull()
    expect(bytes?.[0]).toBe(CHARACTER_BUILD_TYPE)
    expect(bytes?.[1]).toBe(ESO_VERSION_52)
    expect(bytes?.[2]).toBe(CODEC_MINOR_VERSION)
  }
})

test("a recorded build hash read back and written again is the hash it was", () => {
  for (const hash of RECORDED) {
    const build = decodeBuild(buildHash(hash))
    expect(build).not.toBeNull()
    expect(encodeBuild(build as CharacterState)).toBe(buildHash(hash))
  }
})

test("a build carrying equipment, skills and champion points survives update fifty-two", () => {
  const build = representativeBuild()
  expect(decodeBuild(encodeBuild(build))).toEqual(build)
})

test("the character writer stamps update fifty-two", () => {
  const bytes = encodeV52(representativeBuild())
  expect(bytes[0]).toBe(CHARACTER_BUILD_TYPE)
  expect(bytes[1]).toBe(ESO_VERSION_52)
  expect(bytes[2]).toBe(CODEC_MINOR_VERSION)
  expect(ESO_VERSION_52).toBe(52)
})

test("update forty-eight reads back a build laid out as the add-on lays one out", () => {
  const build = representativeBuild()
  const stamped = stampedWith(encodeV52(build), ESO_VERSION_48)
  expect(base64urlToBytes(stamped)?.[1]).toBe(ESO_VERSION_48)
  expect(ESO_VERSION_48).toBe(48)
  expect(decodeBuild(buildHash(stamped))).toEqual(build)
})
