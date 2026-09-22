import { STRINGS_DEFAULT } from "akasha/temper/addon/pages/crafting/modules/knowledge-strings-default/knowledge-strings-default.module.code.ts"
import { STRINGS_ES } from "akasha/temper/addon/pages/crafting/modules/knowledge-strings-es/knowledge-strings-es.module.code.ts"
import { STRINGS_FR } from "akasha/temper/addon/pages/crafting/modules/knowledge-strings-fr/knowledge-strings-fr.module.code.ts"
import { STRINGS_RU } from "akasha/temper/addon/pages/crafting/modules/knowledge-strings-ru/knowledge-strings-ru.module.code.ts"
import { STRINGS_ZH } from "akasha/temper/addon/pages/crafting/modules/knowledge-strings-zh/knowledge-strings-zh.module.code.ts"
import { LCCC } from "akasha/temper/addon/shared/lccc/modules/lccc/lccc.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const BY_LANG: Record<string, ReadonlyArray<[string, string]>> = {
  es: STRINGS_ES,
  fr: STRINGS_FR,
  ru: STRINGS_RU,
  zh: STRINGS_ZH,
}

for (const [id, text] of STRINGS_DEFAULT) {
  LCCC.RegisterString(id, text)
}
const LANG = GetCVar("Language.2")
const OVERRIDES = BY_LANG[LANG]
if (OVERRIDES !== undefined) {
  for (const [id, text] of OVERRIDES) {
    LCCC.RegisterString(id, text)
  }
}
