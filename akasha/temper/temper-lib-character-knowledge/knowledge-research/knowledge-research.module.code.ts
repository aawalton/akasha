import { asNumber } from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import type { ResearchReverseEntry } from "../knowledge-shape/knowledge-shape.module.code.ts"
import { INTERNAL } from "../knowledge-state/knowledge-state.module.code.ts"

export type TradeskillLookup = Record<number, unknown>

type CraftNode = Record<number, Record<number, number>> & { slotsShift: number }
export function asCraftNode(value: unknown): CraftNode {
  return value as CraftNode
}
type LineNode = Record<number, number>
export function asLineNode(value: unknown): LineNode {
  return value as LineNode
}

const TRAIT_BYTES: { value?: number } = {}

const BLOCK_BYTES = 6
const BLOCK_BITS = 36

const TIME_INDEX_SIZE = 2
const TIME_FIELD_SIZE = 4

const TRADESKILL_TYPES: number[] = [
  CRAFTING_TYPE_BLACKSMITHING,
  CRAFTING_TYPE_CLOTHIER,
  CRAFTING_TYPE_WOODWORKING,
  CRAFTING_TYPE_JEWELRYCRAFTING,
]
INTERNAL.TRADESKILL_TYPES = TRADESKILL_TYPES

const LOOKUPS: {
  tradeskill?: TradeskillLookup
  reverse?: Record<number, ResearchReverseEntry>
} = {}

export const ITEM_LOOKUPS: {
  EQUIP: Record<number, number>
  WEAPON: Record<number, number>
  TRAIT: Record<number, number>
  ARMOR_OFFSET: Record<number, number>
} = {
  EQUIP: {
    [EQUIP_TYPE_CHEST]: 1,
    [EQUIP_TYPE_FEET]: 2,
    [EQUIP_TYPE_HAND]: 3,
    [EQUIP_TYPE_HEAD]: 4,
    [EQUIP_TYPE_LEGS]: 5,
    [EQUIP_TYPE_SHOULDERS]: 6,
    [EQUIP_TYPE_WAIST]: 7,
    [EQUIP_TYPE_RING]: 1,
    [EQUIP_TYPE_NECK]: 2,
    [EQUIP_TYPE_MAIN_HAND]: -1,
    [EQUIP_TYPE_OFF_HAND]: -1,
    [EQUIP_TYPE_ONE_HAND]: -1,
    [EQUIP_TYPE_TWO_HAND]: -1,
  },
  WEAPON: {
    [WEAPONTYPE_AXE]: 1,
    [WEAPONTYPE_HAMMER]: 2,
    [WEAPONTYPE_SWORD]: 3,
    [WEAPONTYPE_TWO_HANDED_AXE]: 4,
    [WEAPONTYPE_TWO_HANDED_HAMMER]: 5,
    [WEAPONTYPE_TWO_HANDED_SWORD]: 6,
    [WEAPONTYPE_DAGGER]: 7,
    [WEAPONTYPE_BOW]: 1,
    [WEAPONTYPE_FIRE_STAFF]: 2,
    [WEAPONTYPE_FROST_STAFF]: 3,
    [WEAPONTYPE_LIGHTNING_STAFF]: 4,
    [WEAPONTYPE_HEALING_STAFF]: 5,
    [WEAPONTYPE_SHIELD]: 6,
  },
  TRAIT: {
    [ITEM_TRAIT_TYPE_ARMOR_STURDY]: 1,
    [ITEM_TRAIT_TYPE_ARMOR_IMPENETRABLE]: 2,
    [ITEM_TRAIT_TYPE_ARMOR_REINFORCED]: 3,
    [ITEM_TRAIT_TYPE_ARMOR_WELL_FITTED]: 4,
    [ITEM_TRAIT_TYPE_ARMOR_TRAINING]: 5,
    [ITEM_TRAIT_TYPE_ARMOR_INFUSED]: 6,
    [ITEM_TRAIT_TYPE_ARMOR_PROSPEROUS]: 7,
    [ITEM_TRAIT_TYPE_ARMOR_DIVINES]: 8,
    [ITEM_TRAIT_TYPE_ARMOR_NIRNHONED]: 9,
    [ITEM_TRAIT_TYPE_WEAPON_POWERED]: 1,
    [ITEM_TRAIT_TYPE_WEAPON_CHARGED]: 2,
    [ITEM_TRAIT_TYPE_WEAPON_PRECISE]: 3,
    [ITEM_TRAIT_TYPE_WEAPON_INFUSED]: 4,
    [ITEM_TRAIT_TYPE_WEAPON_DEFENDING]: 5,
    [ITEM_TRAIT_TYPE_WEAPON_TRAINING]: 6,
    [ITEM_TRAIT_TYPE_WEAPON_SHARPENED]: 7,
    [ITEM_TRAIT_TYPE_WEAPON_DECISIVE]: 8,
    [ITEM_TRAIT_TYPE_WEAPON_NIRNHONED]: 9,
    [ITEM_TRAIT_TYPE_JEWELRY_ARCANE]: 1,
    [ITEM_TRAIT_TYPE_JEWELRY_HEALTHY]: 2,
    [ITEM_TRAIT_TYPE_JEWELRY_ROBUST]: 3,
    [ITEM_TRAIT_TYPE_JEWELRY_TRIUNE]: 4,
    [ITEM_TRAIT_TYPE_JEWELRY_INFUSED]: 5,
    [ITEM_TRAIT_TYPE_JEWELRY_PROTECTIVE]: 6,
    [ITEM_TRAIT_TYPE_JEWELRY_SWIFT]: 7,
    [ITEM_TRAIT_TYPE_JEWELRY_HARMONY]: 8,
    [ITEM_TRAIT_TYPE_JEWELRY_BLOODTHIRSTY]: 9,
  },
  ARMOR_OFFSET: {
    [ARMORTYPE_MEDIUM]: 7,
    [ARMORTYPE_HEAVY]: 7,
  },
}

const DIAGNOSTICS = INTERNAL.diagnostics

export function getTraitBytes(this: void): number | undefined {
  return TRAIT_BYTES.value
}

export function getTradeskillLookup(this: void): TradeskillLookup {
  const lookup = LOOKUPS.tradeskill
  if (lookup === undefined) {
    return {}
  }
  return lookup
}

export function getReverseLookup(this: void): Record<number, ResearchReverseEntry> {
  const reverse = LOOKUPS.reverse
  if (reverse === undefined) {
    return {}
  }
  return reverse
}

export function initializeResearch(this: void): undefined {
  if (TRAIT_BYTES.value !== undefined) {
    return
  }

  let index = 0
  const signature: Array<string | number> = []
  LOOKUPS.tradeskill = {}
  LOOKUPS.reverse = {}

  for (const [i, craftingSkillType] of ipairs(TRADESKILL_TYPES)) {
    LOOKUPS.tradeskill[craftingSkillType] = { slotsShift: (i - 1) * 2 }

    for (
      let researchLineIndex = 1;
      researchLineIndex <= GetNumSmithingResearchLines(craftingSkillType);
      researchLineIndex++
    ) {
      asCraftNode(LOOKUPS.tradeskill[craftingSkillType])[researchLineIndex] = {}

      const [, icon, numTraits] = GetSmithingResearchLineInfo(craftingSkillType, researchLineIndex)
      signature.push(icon)
      signature.push(numTraits)

      for (let traitIndex = 1; traitIndex <= numTraits; traitIndex++) {
        index = index + 1
        asLineNode(asCraftNode(LOOKUPS.tradeskill[craftingSkillType])[researchLineIndex])[
          traitIndex
        ] = index
        LOOKUPS.reverse[index] = {
          craftingSkillType: craftingSkillType,
          researchLineIndex: researchLineIndex,
          traitIndex: traitIndex,
        }
      }
    }
  }

  if (DIAGNOSTICS.vars.researchTraits !== index) {
    if (DIAGNOSTICS.vars.researchTraits !== undefined) {
      INTERNAL.MsgTag(GetString(SI_LCK_SCAN_RESEARCH_BAD_TRAITS))
    }
    DIAGNOSTICS.vars.researchTraits = index
  }

  const signatureHash = HashString(table.concat(signature, ","))
  if (DIAGNOSTICS.vars.researchSignature !== signatureHash) {
    if (DIAGNOSTICS.vars.researchSignature !== undefined) {
      INTERNAL.MsgTag(GetString(SI_LCK_SCAN_RESEARCH_BAD_SIG))
    }
    DIAGNOSTICS.vars.researchSignature = signatureHash
  }

  TRAIT_BYTES.value = zo_ceil(index / BLOCK_BITS) * BLOCK_BYTES
}

export function getTraitIndex(
  this: void,
  craftingSkillType?: number,
  researchLineIndex?: number,
  traitIndex?: number
): number | false | undefined {
  initializeResearch()
  if (
    craftingSkillType === undefined ||
    researchLineIndex === undefined ||
    traitIndex === undefined
  ) {
    return undefined
  }
  const lookup = LOOKUPS.tradeskill
  if (lookup === undefined) {
    return undefined
  }
  const craftNode = lookup[craftingSkillType]
  if (craftNode === undefined) {
    return undefined
  }
  const lineNode = asCraftNode(craftNode)[researchLineIndex]
  if (lineNode === undefined) {
    return undefined
  }
  return asLineNode(lineNode)[traitIndex]
}

INTERNAL.ResearchScanAndEncode = function (this: void): string {
  initializeResearch()

  INTERNAL.ResearchCheckPassives()

  let index = 0
  let field = 0
  let slots = 0
  const times: string[] = []
  let result = ""

  for (const [, craftingSkillType] of ipairs(TRADESKILL_TYPES)) {
    for (
      let researchLineIndex = 1;
      researchLineIndex <= GetNumSmithingResearchLines(craftingSkillType);
      researchLineIndex++
    ) {
      const [, , numTraits] = GetSmithingResearchLineInfo(craftingSkillType, researchLineIndex)
      for (let traitIndex = 1; traitIndex <= numTraits; traitIndex++) {
        index = index + 1

        field = field * 2
        const [, , known] = GetSmithingResearchLineTraitInfo(
          craftingSkillType,
          researchLineIndex,
          traitIndex
        )
        if (known === true) {
          field = field + 1
        }
        if (index % BLOCK_BITS === 0) {
          result = result + LCCC.Encode(field, BLOCK_BYTES)
          field = 0
        }

        const [duration, timeRemainingSecs] = GetSmithingResearchLineTraitTimes(
          craftingSkillType,
          researchLineIndex,
          traitIndex
        )
        if (duration !== undefined && timeRemainingSecs !== undefined) {
          times.push(
            LCCC.Encode(index, TIME_INDEX_SIZE) +
              LCCC.Encode(duration, TIME_FIELD_SIZE) +
              LCCC.Encode(timeRemainingSecs, TIME_FIELD_SIZE)
          )
        }
      }
    }

    const shift = asCraftNode(getTradeskillLookup()[craftingSkillType]).slotsShift
    if (shift <= 4) {
      slots = BitOr(
        BitLShift(BitAnd(GetMaxSimultaneousSmithingResearch(craftingSkillType) - 1, 3), shift),
        slots
      )
    }
  }

  const remainder = index % BLOCK_BITS
  if (remainder > 0) {
    result = result + LCCC.Encode(BitLShift(field, BLOCK_BITS - remainder), BLOCK_BYTES)
  }

  return result + LCCC.Encode(slots, 1) + table.concat(times, "")
}

const RESEARCH_PASSIVES: number[] = [79, 5, 80, 5, 81, 5, 141, 4]

const PASSIVES: { current?: number } = {}

INTERNAL.ResearchCheckPassives = function (this: void): boolean {
  const previous = PASSIVES.current
  let current = 0
  for (let i = 1; i <= RESEARCH_PASSIVES.length; i = i + 2) {
    const skillLineId = asNumber(RESEARCH_PASSIVES[i - 1])
    const abilityIndex = asNumber(RESEARCH_PASSIVES[i])
    const [skillType, skillLineIndex] = GetSkillLineIndicesFromSkillLineId(skillLineId)
    const [, , , , , purchased, , rank] = GetSkillAbilityInfo(
      skillType,
      skillLineIndex,
      abilityIndex
    )
    current = current * 8 + (purchased === true ? asNumber(rank) : 0)
  }
  PASSIVES.current = current
  return previous !== current
}
