import { warn as logWarn } from "../writ-log/writ-log.module.code.ts"
import { newSmithingParser } from "../writ-smith-parser/writ-smith-parser.module.code.ts"
import type { SmithingParser } from "../writ-smith-parser-types/writ-smith-parser-types.module.code.ts"
import { smithingInit } from "../writ-smith-schema/writ-smith-schema.module.code.ts"
import type { School } from "../writ-smith-schema-types/writ-smith-schema-types.module.code.ts"

interface MotifEntry {
  pages_id?: number
}

function parseLuaCapture(captured: string | number | undefined): string | undefined {
  return typeof captured === "string" ? captured : undefined
}

export function smithingDiscover(this: void): undefined {
  const sv: Record<string, unknown> = TemperWrit.savedVariables ?? {}
  TemperWrit.savedVariables = sv
  const discover: Record<string, unknown> = {}
  sv["discover"] = discover

  const set: Record<number, string | undefined> = {}
  let setCt = 0
  {
    const t = "|H1:item:138798:6:1:0:0:0:18:255:4:%d:23:0:0:0:0:0:0:0:0:0:76000|h|h"
    const re = "Set: ([^;]*)"
    for (let i = 1; i <= 500; i += 1) {
      const itemLink = string.format(t, i)
      const b = GenerateMasterWritBaseText(itemLink)
      const [, , rawF] = string.find(b, re)
      const f = parseLuaCapture(rawF)
      set[i] = f
      if (f !== undefined) {
        setCt = setCt + 1
      }
    }
  }
  discover["writ4_smithing_set_bonus"] = set
  d("TemperWrit: discovered set_ct:" + tostring(setCt))

  const item: Record<number, string | undefined> = {}
  let itemCt = 0
  {
    const t = "|H1:item:138798:6:1:0:0:0:%d:255:4:37:23:0:0:0:0:0:0:0:0:0:76000|h|h"
    const re = "Craft an? (.*);"
    for (let i = 1; i <= 100; i += 1) {
      const itemLink = string.format(t, i)
      const b = GenerateMasterWritBaseText(itemLink)
      const [, , rawF] = string.find(b, re)
      const f = parseLuaCapture(rawF)
      item[i] = f
      if (f !== undefined) {
        itemCt = itemCt + 1
      }
    }
  }
  discover["writ4_smithing_item"] = item
  d("TemperWrit: discovered item_ct:" + tostring(itemCt))

  const mat: Record<number, string | undefined> = {}
  let matCt = 0
  {
    const t = "|H1:item:138798:6:1:0:0:0:18:%d:4:37:23:0:0:0:0:0:0:0:0:0:76000|h|h"
    const re = "Craft an? ([^;]*);"
    for (let i = 170; i <= 255; i += 1) {
      const itemLink = string.format(t, i)
      const b = GenerateMasterWritBaseText(itemLink)
      const [, , rawF] = string.find(b, re)
      const f = parseLuaCapture(rawF)
      mat[i] = f
      if (f !== undefined) {
        matCt = matCt + 1
      }
    }
  }
  discover["writ2_smithing_mat"] = mat
  d("TemperWrit: discovered mat_ct:" + tostring(matCt))

  const trait: Record<number, string | undefined> = {}
  let traitCt = 0
  {
    const t = "|H1:item:119563:6:1:0:0:0:56:188:4:324:%d:51:0:0:0:0:0:0:0:0:72000|h|h"
    const re = "Trait: ([^;]*);"
    for (let i = 1; i <= 50; i += 1) {
      const itemLink = string.format(t, i)
      const b = GenerateMasterWritBaseText(itemLink)
      const [, , rawF] = string.find(b, re)
      const f = parseLuaCapture(rawF)
      trait[i] = f
      if (f !== undefined) {
        traitCt = traitCt + 1
      }
    }
  }
  discover["writ5_smithing_trait"] = trait
  d("TemperWrit: discovered trait_ct:" + tostring(traitCt))

  const motif: Record<number, string | undefined> = {}
  let motifCt = 0
  {
    const t = "|H1:item:119563:6:1:0:0:0:56:188:4:324:4:%d:0:0:0:0:0:0:0:0:72000|h|h"
    const re = "Style: ([^;]*)"
    for (let i = 1; i <= 100; i += 1) {
      const itemLink = string.format(t, i)
      const b = GenerateMasterWritBaseText(itemLink)
      const [, , rawF] = string.find(b, re)
      const f = parseLuaCapture(rawF)
      motif[i] = f
      if (f !== undefined) {
        motifCt = motifCt + 1
      }
    }
  }
  discover["writ6_smithing_motif"] = motif
  d("TemperWrit: discovered motif_ct:" + tostring(motifCt))

  const skillLine: Record<number, unknown> = {}
  const skillLineCt = GetNumSkillLines(SKILL_TYPE_TRADESKILL)
  let totalAbilityCt = 0
  for (let skillIndex = 1; skillIndex <= skillLineCt; skillIndex += 1) {
    const [name, rank, discovered, skillLineId, advised, unlockText] = GetSkillLineInfo(
      SKILL_TYPE_TRADESKILL,
      skillIndex
    )
    const ability: Record<number, unknown> = {}
    const ss = {
      name,
      rank,
      discovered,
      skillLineId,
      advised,
      unlockText,
      ability,
    }
    skillLine[skillIndex] = ss

    const abilityCt = GetNumSkillAbilities(SKILL_TYPE_TRADESKILL, skillIndex)
    for (let abilityIndex = 1; abilityIndex <= abilityCt; abilityIndex += 1) {
      const [
        aName,
        textureName,
        earnedRank,
        passive,
        ultimate,
        purchased,
        progressionIndex,
        rankIndex,
      ] = GetSkillAbilityInfo(SKILL_TYPE_TRADESKILL, skillIndex, abilityIndex)
      const abilityId = GetSkillAbilityId(SKILL_TYPE_TRADESKILL, skillIndex, abilityIndex, false)
      const aa = {
        name: aName,
        textureName,
        earnedRank,
        passive,
        ultimate,
        purchased,
        progressionIndex,
        rankIndex,
        abilityId,
      }
      ability[abilityIndex] = aa
      totalAbilityCt = totalAbilityCt + 1
    }
  }
  discover["skill_line"] = skillLine
  d("TemperWrit: discovered ability_ct:" + tostring(totalAbilityCt))
}

export function smithingScanMotifs(this: void): undefined {
  const achieveKnown: Record<number, number> = {}
  const motifTable = TemperWrit.Smithing?.MOTIF
  if (motifTable !== undefined) {
    for (const [motifId, motifT] of pairs(motifTable)) {
      if (motifT !== undefined && motifT.pages_id !== undefined) {
        achieveKnown[motifT.pages_id] = motifId
      }
    }
  }
  achieveKnown[2230] = 0
  achieveKnown[1418] = 0
  achieveKnown[1043] = 0
  achieveKnown[1030] = 0

  const catCt = GetNumAchievementCategories()
  for (let catI = 1; catI <= catCt; catI += 1) {
    const [, subcatCt, achieveSubcat0Ct] = GetAchievementCategoryInfo(catI)
    let achieveCt = 0
    for (let subcatI = 0; subcatI <= subcatCt; subcatI += 1) {
      let subcatIi: number | undefined = subcatI
      if (subcatI === 0) {
        achieveCt = achieveSubcat0Ct
        subcatIi = undefined
      } else {
        const [, subAchieveCt] = GetAchievementSubCategoryInfo(catI, subcatI)
        achieveCt = subAchieveCt
      }

      for (let achieveI = 1; achieveI <= achieveCt; achieveI += 1) {
        const achieveId = GetAchievementId(catI, subcatIi, achieveI)
        const [achieveName] = GetAchievementInfo(achieveId)

        if (achieveKnown[achieveId] !== undefined) {
        } else {
          const [matchStart] = string.find(string.lower(achieveName), "style master")
          if (matchStart !== undefined) {
            logWarn("%d %s", achieveId, achieveName)
          }
        }
      }
    }
  }
}

export interface SmithingNamespace {
  Init: (this: void) => undefined
  Discover: (this: void) => undefined
  ScanMotifs: (this: void) => undefined
  Parser: {
    class: string
    New: (this: SmithingNamespace["Parser"]) => SmithingParser
  }
  MOTIF?: Record<number, MotifEntry | undefined>
  SCHOOL_WOOD?: School
  SCHOOL_JEWELRY?: School | undefined
}

const PARSER_NAMESPACE: SmithingNamespace["Parser"] = {
  class: "smithing",
  New: newSmithingParser,
}

const SMITHING_NAMESPACE: SmithingNamespace = {
  Init: smithingInit,
  Discover: smithingDiscover,
  ScanMotifs: smithingScanMotifs,
  Parser: PARSER_NAMESPACE,
}

TemperWrit.Smithing = SMITHING_NAMESPACE
