import type { AccountData } from "../craft-account-init/craft-account-init.module.code.ts"
import type { CharacterData } from "../craft-char-init/craft-char-init.module.code.ts"
import { COOK, type CookTable } from "../craft-cook/craft-cook.module.code.ts"
import { FURNISHER, type FurnisherTable } from "../craft-furnisher/craft-furnisher.module.code.ts"
import { LANG } from "../craft-lang-index/craft-lang-index.module.code.ts"
import type { LangTable } from "../craft-lang-lang-table/craft-lang-lang-table.module.code.ts"
import {
  type CsQualityColor,
  QUALITY,
  QUALITY_HEX,
} from "../craft-quality/craft-quality.module.code.ts"
import { RUNE, type RuneTable } from "../craft-rune/craft-rune.module.code.ts"
import { type CraftedSetEntry, SETS } from "../craft-sets-data/craft-sets-data.module.code.ts"
import type { StyleApi } from "../craft-styles-data/craft-styles-data.module.code.ts"
import {
  CHAMPION_POINTS_TEXTURE,
  HealthName,
  MagickaName,
  StaminaName,
} from "../crafting-constants/crafting-constants.module.code.ts"

export interface StyleNameRow {
  name: string
  id: number
  motif: number
}

export interface QuestEntry {
  id: number
  name: string
  work: Record<number, string>
}

export interface DataTables {
  crafting: {
    researched: Record<string, Record<number, Record<number, Record<number, boolean | number>>>>
  }
}

export interface TemperCraftingState {
  Debug: boolean
  Name: string
  Title: string
  Version: string
  Account: AccountData
  Character: CharacterData
  Init: boolean
  MaxTraits: number
  JewelryMaxTraits: number
  Loc: LangTable
  Quest: Record<number, QuestEntry>
  Extern: boolean
  Inspiration: string
  HealthName: string
  MagickaName: string
  StaminaName: string
  CurrentPlayer: string
  SelectedPlayer: string
  UIClosed: boolean
  ChampionPointsTexture: string
  Data: DataTables
  SELF: boolean
  ItemLinkCache: Record<number, Record<number, string>>
  previewType: Record<string, number>
  selectedControl: Control | undefined
  Style: StyleApi | undefined
  styleNames: StyleNameRow[]
  Chat: ChatProxy
  Quality: Record<number, CsQualityColor>
  QualityHex: Record<number, string>
  Cook: CookTable
  Furnisher: FurnisherTable
  Rune: RuneTable
  Sets: Record<number, CraftedSetEntry>
}

ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE", "Temper Crafting")

const [, , maxTraits] = GetSmithingResearchLineInfo(1, 1)
const [, , jewelryMaxTraits] = GetSmithingResearchLineInfo(7, 1)

const langTables: Record<string, LangTable> = LANG
const Loc = langTables[GetCVar("language.2")] ?? LANG.en

const currentPlayer = zo_strformat("<<C:1>>", GetUnitName("player"))

function asAccountData(placeholder: unknown): AccountData {
  return placeholder as AccountData
}

function asCharacterData(placeholder: unknown): CharacterData {
  return placeholder as CharacterData
}

export const STATE: TemperCraftingState = {
  Debug: GetWorldName() === "PTS" || GetDisplayName() === "@VladislavAksjonov",
  Name: "TemperCrafting",
  Title: "Temper Crafting",
  Version: "3.04",
  Account: asAccountData(undefined),
  Character: asCharacterData(undefined),
  Init: false,
  MaxTraits: maxTraits,
  JewelryMaxTraits: jewelryMaxTraits,
  Loc: Loc,
  Quest: {},
  Extern: false,
  Inspiration: "",
  HealthName: HealthName,
  MagickaName: MagickaName,
  StaminaName: StaminaName,
  CurrentPlayer: currentPlayer,
  SelectedPlayer: currentPlayer,
  UIClosed: false,
  ChampionPointsTexture: CHAMPION_POINTS_TEXTURE,
  Data: {
    crafting: { researched: {} },
  },
  SELF: false,
  ItemLinkCache: {
    [BAG_BACKPACK]: {},
    [BAG_BANK]: {},
    [BAG_VIRTUAL]: {},
    [BAG_SUBSCRIBER_BANK]: {},
  },
  previewType: {
    [Loc.previewType[0]]: 1,
    [Loc.previewType[1]]: 2,
    [Loc.previewType[2]]: 3,
    [Loc.previewType[3]]: 4,
  },
  selectedControl: undefined,
  Style: undefined,
  styleNames: [],
  Chat: {
    Print(str) {
      if (str === undefined) {
        return
      }
      d("|cEEEE00[TemperCrafting]|r " + str)
    },
  },
  Quality: QUALITY,
  QualityHex: QUALITY_HEX,
  Cook: COOK,
  Furnisher: FURNISHER,
  Rune: RUNE,
  Sets: SETS,
}
