import { ADDON_NAME } from "../quests-constants/quests-constants.module.code.ts"
import type { ChatterOptionKind } from "../quests-decide/quests-decide.module.code.ts"

const MAD_GODS_BARGAIN_NAME = "the mad god's bargain"

const PERSUADE_PREFIX = "[persuade]"
const INTIMIDATE_PREFIX = "[intimidate]"

export interface RawOption {
  readonly index: number
  readonly text: string
  readonly textLower: string
  readonly optionType: number
  readonly isImportant: boolean
  readonly chosenBefore: boolean
  kind: ChatterOptionKind
}

function luaStringContains(haystack: string, needle: string): boolean {
  const [pos] = string.find(haystack, needle, 1, true)
  return pos !== undefined
}

function isServiceOptionType(optionType: number): boolean {
  return (
    optionType === CHATTER_START_SHOP ||
    optionType === CHATTER_START_BANK ||
    optionType === CHATTER_START_GUILDBANK ||
    optionType === CHATTER_START_MAIL ||
    optionType === CHATTER_START_CRAFT ||
    optionType === CHATTER_START_STABLE ||
    optionType === CHATTER_START_TRADINGHOUSE ||
    optionType === CHATTER_START_DYE_STATION ||
    optionType === CHATTER_START_RETRAIT ||
    optionType === CHATTER_START_REPAIR_ALL ||
    optionType === CHATTER_START_BUY_BAG_SPACE ||
    optionType === CHATTER_START_ATTRIBUTE_RESPEC ||
    optionType === CHATTER_START_SKILL_RESPEC
  )
}

function isBlockedOptionType(optionType: number): boolean {
  return (
    optionType === CHATTER_TALK_CHOICE_PERSUADE_DISABLED ||
    optionType === CHATTER_TALK_CHOICE_INTIMIDATE_DISABLED
  )
}

export function classifyOptionType(optionType: number, textLower: string): ChatterOptionKind {
  if (
    luaStringContains(textLower, PERSUADE_PREFIX) ||
    luaStringContains(textLower, INTIMIDATE_PREFIX)
  ) {
    return "persuade-intimidate"
  }
  if (
    optionType === CHATTER_START_NEW_QUEST_BESTOWAL ||
    optionType === CHATTER_OFFER_QUEST_BESTOWAL ||
    optionType === CHATTER_ACCEPT_QUEST_BESTOWAL
  ) {
    return "accept-quest"
  }
  if (
    optionType === CHATTER_START_ADVANCE_COMPLETABLE_QUEST_CONDITIONS ||
    optionType === CHATTER_START_GIVE_ITEM ||
    optionType === CHATTER_GIVE_ITEM_COMPLETE
  ) {
    return "advance-quest"
  }
  if (
    optionType === CHATTER_START_COMPLETE_QUEST ||
    optionType === CHATTER_COMPLETE_QUEST_DIALOG ||
    optionType === CHATTER_COMPLETE_QUEST_CONFIRM
  ) {
    return "complete-quest"
  }
  if (optionType === CHATTER_GOODBYE) return "goodbye"
  if (isServiceOptionType(optionType)) return "service"
  if (isBlockedOptionType(optionType)) return "blocked"
  return "talk"
}

function isMadGodsBargainActive(): boolean {
  const count = GetNumJournalQuests()
  for (let i = 1; i <= count; i++) {
    if (string.lower(GetJournalQuestName(i)) === MAD_GODS_BARGAIN_NAME) return true
  }
  return false
}

export function applyFoliumBranch(options: readonly RawOption[]): undefined {
  if (!isMadGodsBargainActive()) return
  const branches = options.filter((o) => o.kind === "talk" || o.kind === "complete-quest")
  if (branches.length < 2) return

  d(`[${ADDON_NAME}] Mad God's Bargain choice detected; options:`)
  for (const b of branches) d(`[${ADDON_NAME}]   ${b.index}: ${b.text}`)

  const keywordMatch = branches.find((o) => luaStringContains(o.textLower, "folium"))
  const target = keywordMatch ?? branches[1]
  if (target !== undefined) target.kind = "folium-skill-point"
}
