import {
  LANG_DE,
  LANG_EN,
  LANG_ES,
  LANG_FR,
  LANG_JP,
  LANG_PL,
  LANG_RU,
  LANG_ZH,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-drop-name-language-codes/sets-drop-name-language-codes.module.code.ts"
import { DE } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-drop-name-names-de/sets-drop-name-names-de.module.code.ts"
import { EN } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-drop-name-names-en/sets-drop-name-names-en.module.code.ts"
import { ES } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-drop-name-names-es/sets-drop-name-names-es.module.code.ts"
import { FR } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-drop-name-names-fr/sets-drop-name-names-fr.module.code.ts"
import { JP } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-drop-name-names-jp/sets-drop-name-names-jp.module.code.ts"
import { PL } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-drop-name-names-pl/sets-drop-name-names-pl.module.code.ts"
import { RU } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-drop-name-names-ru/sets-drop-name-names-ru.module.code.ts"
import { ZH } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-drop-name-names-zh/sets-drop-name-names-zh.module.code.ts"
import { checkIfPTSAPIVersionIsLive } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-drop-name-shared-text/sets-drop-name-shared-text.module.code.ts"
import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

lib.dropMechanicIdToName = {
  [LANG_DE]: DE,
  [LANG_EN]: EN,
  [LANG_ES]: ES,
  [LANG_FR]: FR,
  [LANG_PL]: PL,
  [LANG_RU]: RU,
  [LANG_JP]: JP,
  [LANG_ZH]: ZH,
}
if (checkIfPTSAPIVersionIsLive()) {
}
