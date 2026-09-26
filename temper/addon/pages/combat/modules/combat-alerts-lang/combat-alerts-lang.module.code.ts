import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { CRUTCH_BOSS_STRINGS_DE } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-de-bosses/combat-alerts-lang-de-bosses.module.code.ts"
import { CRUTCH_LINE_STRINGS_DE } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-de-lines/combat-alerts-lang-de-lines.module.code.ts"
import { CRUTCH_BOSS_STRINGS_EN } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-en-bosses/combat-alerts-lang-en-bosses.module.code.ts"
import { CRUTCH_LINE_STRINGS_EN } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-en-lines/combat-alerts-lang-en-lines.module.code.ts"
import { CRUTCH_BOSS_STRINGS_ES } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-es-bosses/combat-alerts-lang-es-bosses.module.code.ts"
import { CRUTCH_LINE_STRINGS_ES } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-es-lines/combat-alerts-lang-es-lines.module.code.ts"
import { CRUTCH_BOSS_STRINGS_FR } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-fr-bosses/combat-alerts-lang-fr-bosses.module.code.ts"
import { CRUTCH_LINE_STRINGS_FR } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-fr-lines/combat-alerts-lang-fr-lines.module.code.ts"
import type { CrutchStringId } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-ids/combat-alerts-lang-ids.module.code.ts"
import { CRUTCH_BOSS_STRINGS_JP } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-jp-bosses/combat-alerts-lang-jp-bosses.module.code.ts"
import { CRUTCH_LINE_STRINGS_JP } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-jp-lines/combat-alerts-lang-jp-lines.module.code.ts"
import { CRUTCH_BOSS_STRINGS_PL } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-pl-bosses/combat-alerts-lang-pl-bosses.module.code.ts"
import { CRUTCH_BOSS_STRINGS_RU } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-ru-bosses/combat-alerts-lang-ru-bosses.module.code.ts"
import { CRUTCH_LINE_STRINGS_RU } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-ru-lines/combat-alerts-lang-ru-lines.module.code.ts"
import { CRUTCH_BOSS_STRINGS_ZH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-zh-bosses/combat-alerts-lang-zh-bosses.module.code.ts"
import { CRUTCH_LINE_STRINGS_ZH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang-zh-lines/combat-alerts-lang-zh-lines.module.code.ts"

type CrutchStringTable = Partial<Record<CrutchStringId, string>>

const TABLES_BY_LANGUAGE: Record<string, readonly CrutchStringTable[] | undefined> = {
  de: [CRUTCH_BOSS_STRINGS_DE, CRUTCH_LINE_STRINGS_DE],
  es: [CRUTCH_BOSS_STRINGS_ES, CRUTCH_LINE_STRINGS_ES],
  fr: [CRUTCH_BOSS_STRINGS_FR, CRUTCH_LINE_STRINGS_FR],
  jp: [CRUTCH_BOSS_STRINGS_JP, CRUTCH_LINE_STRINGS_JP],
  ru: [CRUTCH_BOSS_STRINGS_RU, CRUTCH_LINE_STRINGS_RU],
  zh: [CRUTCH_BOSS_STRINGS_ZH, CRUTCH_LINE_STRINGS_ZH],
  pl: [CRUTCH_BOSS_STRINGS_PL],
}

const ENGLISH: readonly CrutchStringTable[] = [CRUTCH_BOSS_STRINGS_EN, CRUTCH_LINE_STRINGS_EN]

const chosenTables = TABLES_BY_LANGUAGE[GetCVar("language.2")] ?? []

function lookUp(
  this: void,
  tables: readonly CrutchStringTable[],
  id: CrutchStringId
): string | undefined {
  for (const table of tables) {
    const found = table[id]
    if (found !== undefined) return found
  }
  return undefined
}

export function crutchString(this: void, id: CrutchStringId): string {
  return lookUp(chosenTables, id) ?? lookUp(ENGLISH, id) ?? id
}
