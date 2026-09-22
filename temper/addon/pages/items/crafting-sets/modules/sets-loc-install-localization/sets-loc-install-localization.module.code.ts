import { asPresent } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
import { fallbackLang } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-loc-game-strings/sets-loc-game-strings.module.code.ts"
import {
  LANG_DE,
  LANG_EN,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-loc-language-codes/sets-loc-language-codes.module.code.ts"
import { BOOLEAN_TO_ON_OFF } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-loc-on-off-labels/sets-loc-on-off-labels.module.code.ts"
import { DE } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-loc-strings-de/sets-loc-strings-de.module.code.ts"
import { EN } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-loc-strings-en/sets-loc-strings-en.module.code.ts"

lib.localization = {
  [LANG_DE]: DE,
  [LANG_EN]: EN,
}

asPresent(lib.localization[fallbackLang]).booleanToOnOff = BOOLEAN_TO_ON_OFF
