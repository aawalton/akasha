import { BR } from "../craft-lang-br/craft-lang-br.module.code.ts"
import { DE } from "../craft-lang-de/craft-lang-de.module.code.ts"
import { EN } from "../craft-lang-en/craft-lang-en.module.code.ts"
import { ES } from "../craft-lang-es/craft-lang-es.module.code.ts"
import { FR } from "../craft-lang-fr/craft-lang-fr.module.code.ts"
import { IT } from "../craft-lang-it/craft-lang-it.module.code.ts"
import type { LangTable } from "../craft-lang-lang-table/craft-lang-lang-table.module.code.ts"
import { RU } from "../craft-lang-ru/craft-lang-ru.module.code.ts"
import { ZH } from "../craft-lang-zh/craft-lang-zh.module.code.ts"

export const LANG = {
  de: DE,
  en: EN,
  fr: FR,
  br: BR,
  ru: RU,
  it: IT,
  es: ES,
  zh: ZH,
} satisfies Record<string, LangTable>
