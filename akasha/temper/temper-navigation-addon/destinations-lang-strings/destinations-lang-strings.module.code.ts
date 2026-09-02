import {
  COLLECTIBLE_DATA_INDEX as COLLECTIBLE_INDEX_DE,
  COLLECTIBLE_DATA_STORE as COLLECTIBLE_STORE_DE,
} from "../destinations-lang-collectibles-de/destinations-lang-collectibles-de.module.code.ts"
import {
  COLLECTIBLE_DATA_INDEX as COLLECTIBLE_INDEX_EN,
  COLLECTIBLE_DATA_STORE as COLLECTIBLE_STORE_EN,
} from "../destinations-lang-collectibles-en/destinations-lang-collectibles-en.module.code.ts"
import {
  COLLECTIBLE_DATA_INDEX as COLLECTIBLE_INDEX_FR,
  COLLECTIBLE_DATA_STORE as COLLECTIBLE_STORE_FR,
} from "../destinations-lang-collectibles-fr/destinations-lang-collectibles-fr.module.code.ts"
import {
  COLLECTIBLE_DATA_INDEX as COLLECTIBLE_INDEX_FX,
  COLLECTIBLE_DATA_STORE as COLLECTIBLE_STORE_FX,
} from "../destinations-lang-collectibles-fx/destinations-lang-collectibles-fx.module.code.ts"
import {
  COLLECTIBLE_DATA_INDEX as COLLECTIBLE_INDEX_JF,
  COLLECTIBLE_DATA_STORE as COLLECTIBLE_STORE_JF,
} from "../destinations-lang-collectibles-jf/destinations-lang-collectibles-jf.module.code.ts"
import {
  COLLECTIBLE_DATA_INDEX as COLLECTIBLE_INDEX_JP,
  COLLECTIBLE_DATA_STORE as COLLECTIBLE_STORE_JP,
} from "../destinations-lang-collectibles-jp/destinations-lang-collectibles-jp.module.code.ts"
import {
  COLLECTIBLE_DATA_INDEX as COLLECTIBLE_INDEX_PL,
  COLLECTIBLE_DATA_STORE as COLLECTIBLE_STORE_PL,
} from "../destinations-lang-collectibles-pl/destinations-lang-collectibles-pl.module.code.ts"
import {
  COLLECTIBLE_DATA_INDEX as COLLECTIBLE_INDEX_RU,
  COLLECTIBLE_DATA_STORE as COLLECTIBLE_STORE_RU,
} from "../destinations-lang-collectibles-ru/destinations-lang-collectibles-ru.module.code.ts"
import {
  COLLECTIBLE_DATA_INDEX as COLLECTIBLE_INDEX_ZH,
  COLLECTIBLE_DATA_STORE as COLLECTIBLE_STORE_ZH,
} from "../destinations-lang-collectibles-zh/destinations-lang-collectibles-zh.module.code.ts"
import { SETTINGS_STRINGS as SETTINGS_DE } from "../destinations-lang-settings-de/destinations-lang-settings-de.module.code.ts"
import { SETTINGS_STRINGS as SETTINGS_EN } from "../destinations-lang-settings-en/destinations-lang-settings-en.module.code.ts"
import { SETTINGS_STRINGS as SETTINGS_ES } from "../destinations-lang-settings-es/destinations-lang-settings-es.module.code.ts"
import { SETTINGS_STRINGS as SETTINGS_FR } from "../destinations-lang-settings-fr/destinations-lang-settings-fr.module.code.ts"
import { SETTINGS_STRINGS as SETTINGS_FX } from "../destinations-lang-settings-fx/destinations-lang-settings-fx.module.code.ts"
import { SETTINGS_STRINGS as SETTINGS_JF } from "../destinations-lang-settings-jf/destinations-lang-settings-jf.module.code.ts"
import { SETTINGS_STRINGS as SETTINGS_JP } from "../destinations-lang-settings-jp/destinations-lang-settings-jp.module.code.ts"
import { SETTINGS_STRINGS as SETTINGS_PL } from "../destinations-lang-settings-pl/destinations-lang-settings-pl.module.code.ts"
import { SETTINGS_STRINGS as SETTINGS_RU } from "../destinations-lang-settings-ru/destinations-lang-settings-ru.module.code.ts"
import { SETTINGS_STRINGS as SETTINGS_ZH } from "../destinations-lang-settings-zh/destinations-lang-settings-zh.module.code.ts"

export interface CollectiblesData {
  CollectibleDataIndex: { KEY: number; NUMBER: number; NAME: number }
  CollectibleDataStore: Record<number, (string | number)[][]>
}

const SETTINGS_STRINGS_BY_LANGUAGE: Record<string, Record<string, string> | undefined> = {
  de: SETTINGS_DE,
  en: SETTINGS_EN,
  es: SETTINGS_ES,
  fr: SETTINGS_FR,
  fx: SETTINGS_FX,
  jf: SETTINGS_JF,
  jp: SETTINGS_JP,
  pl: SETTINGS_PL,
  ru: SETTINGS_RU,
  zh: SETTINGS_ZH,
}

const COLLECTIBLES_BY_LANGUAGE: Record<string, CollectiblesData | undefined> = {
  de: { CollectibleDataIndex: COLLECTIBLE_INDEX_DE, CollectibleDataStore: COLLECTIBLE_STORE_DE },
  en: { CollectibleDataIndex: COLLECTIBLE_INDEX_EN, CollectibleDataStore: COLLECTIBLE_STORE_EN },
  fr: { CollectibleDataIndex: COLLECTIBLE_INDEX_FR, CollectibleDataStore: COLLECTIBLE_STORE_FR },
  fx: { CollectibleDataIndex: COLLECTIBLE_INDEX_FX, CollectibleDataStore: COLLECTIBLE_STORE_FX },
  jf: { CollectibleDataIndex: COLLECTIBLE_INDEX_JF, CollectibleDataStore: COLLECTIBLE_STORE_JF },
  jp: { CollectibleDataIndex: COLLECTIBLE_INDEX_JP, CollectibleDataStore: COLLECTIBLE_STORE_JP },
  pl: { CollectibleDataIndex: COLLECTIBLE_INDEX_PL, CollectibleDataStore: COLLECTIBLE_STORE_PL },
  ru: { CollectibleDataIndex: COLLECTIBLE_INDEX_RU, CollectibleDataStore: COLLECTIBLE_STORE_RU },
  zh: { CollectibleDataIndex: COLLECTIBLE_INDEX_ZH, CollectibleDataStore: COLLECTIBLE_STORE_ZH },
}

const clientLanguage: string = GetCVar("Language.2")

export function getClientLanguage(): string {
  return clientLanguage
}

const activeSettingsStrings: Record<string, string> =
  SETTINGS_STRINGS_BY_LANGUAGE[clientLanguage] ?? SETTINGS_EN

export function registerSettingsStrings(): undefined {
  for (const [key, value] of Object.entries(activeSettingsStrings)) {
    ZO_CreateStringId(key, value)
  }
}

export function getSettingsString(key: string): string {
  return activeSettingsStrings[key] ?? SETTINGS_EN[key] ?? ""
}

export function getCollectiblesData(): CollectiblesData {
  return (
    COLLECTIBLES_BY_LANGUAGE[clientLanguage] ?? {
      CollectibleDataIndex: COLLECTIBLE_INDEX_EN,
      CollectibleDataStore: COLLECTIBLE_STORE_EN,
    }
  )
}
