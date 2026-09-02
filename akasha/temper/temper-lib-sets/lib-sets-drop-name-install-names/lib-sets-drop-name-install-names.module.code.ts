import {
  LANG_DE,
  LANG_EN,
  LANG_ES,
  LANG_FR,
  LANG_JP,
  LANG_PL,
  LANG_RU,
  LANG_ZH,
} from "../lib-sets-drop-name-language-codes/lib-sets-drop-name-language-codes.module.code.ts"
import { DE } from "../lib-sets-drop-name-names-de/lib-sets-drop-name-names-de.module.code.ts"
import { EN } from "../lib-sets-drop-name-names-en/lib-sets-drop-name-names-en.module.code.ts"
import { ES } from "../lib-sets-drop-name-names-es/lib-sets-drop-name-names-es.module.code.ts"
import { FR } from "../lib-sets-drop-name-names-fr/lib-sets-drop-name-names-fr.module.code.ts"
import { JP } from "../lib-sets-drop-name-names-jp/lib-sets-drop-name-names-jp.module.code.ts"
import { PL } from "../lib-sets-drop-name-names-pl/lib-sets-drop-name-names-pl.module.code.ts"
import { RU } from "../lib-sets-drop-name-names-ru/lib-sets-drop-name-names-ru.module.code.ts"
import { ZH } from "../lib-sets-drop-name-names-zh/lib-sets-drop-name-names-zh.module.code.ts"
import {
  checkIfPTSAPIVersionIsLive,
  lib,
} from "../lib-sets-drop-name-shared-text/lib-sets-drop-name-shared-text.module.code.ts"

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
