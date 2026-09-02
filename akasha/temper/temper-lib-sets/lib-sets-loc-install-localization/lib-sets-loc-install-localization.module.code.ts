import { asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  fallbackLang,
  lib,
} from "../lib-sets-loc-game-strings/lib-sets-loc-game-strings.module.code.ts"
import {
  LANG_DE,
  LANG_EN,
} from "../lib-sets-loc-language-codes/lib-sets-loc-language-codes.module.code.ts"
import { BOOLEAN_TO_ON_OFF } from "../lib-sets-loc-on-off-labels/lib-sets-loc-on-off-labels.module.code.ts"
import { DE } from "../lib-sets-loc-strings-de/lib-sets-loc-strings-de.module.code.ts"
import { EN } from "../lib-sets-loc-strings-en/lib-sets-loc-strings-en.module.code.ts"

lib.localization = {
  [LANG_DE]: DE,
  [LANG_EN]: EN,
}

asPresent(lib.localization[fallbackLang]).booleanToOnOff = BOOLEAN_TO_ON_OFF
