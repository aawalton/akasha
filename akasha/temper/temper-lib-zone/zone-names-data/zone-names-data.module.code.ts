import { ZONE_NAMES_DE_00 } from "../zone-names-de-00/zone-names-de-00.module.code.ts"
import { ZONE_NAMES_DE_01 } from "../zone-names-de-01/zone-names-de-01.module.code.ts"
import { ZONE_NAMES_DE_02 } from "../zone-names-de-02/zone-names-de-02.module.code.ts"
import { ZONE_NAMES_DE_03 } from "../zone-names-de-03/zone-names-de-03.module.code.ts"
import { ZONE_NAMES_EN_00 } from "../zone-names-en-00/zone-names-en-00.module.code.ts"
import { ZONE_NAMES_EN_01 } from "../zone-names-en-01/zone-names-en-01.module.code.ts"
import { ZONE_NAMES_EN_02 } from "../zone-names-en-02/zone-names-en-02.module.code.ts"
import { ZONE_NAMES_ES_00 } from "../zone-names-es-00/zone-names-es-00.module.code.ts"
import { ZONE_NAMES_ES_01 } from "../zone-names-es-01/zone-names-es-01.module.code.ts"
import { ZONE_NAMES_ES_02 } from "../zone-names-es-02/zone-names-es-02.module.code.ts"
import { ZONE_NAMES_ES_03 } from "../zone-names-es-03/zone-names-es-03.module.code.ts"
import { ZONE_NAMES_FR_00 } from "../zone-names-fr-00/zone-names-fr-00.module.code.ts"
import { ZONE_NAMES_FR_01 } from "../zone-names-fr-01/zone-names-fr-01.module.code.ts"
import { ZONE_NAMES_FR_02 } from "../zone-names-fr-02/zone-names-fr-02.module.code.ts"
import { ZONE_NAMES_FR_03 } from "../zone-names-fr-03/zone-names-fr-03.module.code.ts"
import { ZONE_NAMES_JP_00 } from "../zone-names-jp-00/zone-names-jp-00.module.code.ts"
import { ZONE_NAMES_JP_01 } from "../zone-names-jp-01/zone-names-jp-01.module.code.ts"
import { ZONE_NAMES_JP_02 } from "../zone-names-jp-02/zone-names-jp-02.module.code.ts"
import { ZONE_NAMES_JP_03 } from "../zone-names-jp-03/zone-names-jp-03.module.code.ts"
import { ZONE_NAMES_PL_00 } from "../zone-names-pl-00/zone-names-pl-00.module.code.ts"
import { ZONE_NAMES_PL_01 } from "../zone-names-pl-01/zone-names-pl-01.module.code.ts"
import { ZONE_NAMES_PL_02 } from "../zone-names-pl-02/zone-names-pl-02.module.code.ts"
import { ZONE_NAMES_RU_00 } from "../zone-names-ru-00/zone-names-ru-00.module.code.ts"
import { ZONE_NAMES_RU_01 } from "../zone-names-ru-01/zone-names-ru-01.module.code.ts"
import { ZONE_NAMES_RU_02 } from "../zone-names-ru-02/zone-names-ru-02.module.code.ts"
import { ZONE_NAMES_RU_03 } from "../zone-names-ru-03/zone-names-ru-03.module.code.ts"
import { ZONE_NAMES_RU_04 } from "../zone-names-ru-04/zone-names-ru-04.module.code.ts"
import { ZONE_NAMES_ZH_00 } from "../zone-names-zh-00/zone-names-zh-00.module.code.ts"
import { ZONE_NAMES_ZH_01 } from "../zone-names-zh-01/zone-names-zh-01.module.code.ts"
import { ZONE_NAMES_ZH_02 } from "../zone-names-zh-02/zone-names-zh-02.module.code.ts"

export const PRELOADED_ZONE_NAMES: Record<string, Record<number, string>> = {
  de: {
    ...ZONE_NAMES_DE_00,
    ...ZONE_NAMES_DE_01,
    ...ZONE_NAMES_DE_02,
    ...ZONE_NAMES_DE_03,
  },
  en: {
    ...ZONE_NAMES_EN_00,
    ...ZONE_NAMES_EN_01,
    ...ZONE_NAMES_EN_02,
  },
  es: {
    ...ZONE_NAMES_ES_00,
    ...ZONE_NAMES_ES_01,
    ...ZONE_NAMES_ES_02,
    ...ZONE_NAMES_ES_03,
  },
  fr: {
    ...ZONE_NAMES_FR_00,
    ...ZONE_NAMES_FR_01,
    ...ZONE_NAMES_FR_02,
    ...ZONE_NAMES_FR_03,
  },
  jp: {
    ...ZONE_NAMES_JP_00,
    ...ZONE_NAMES_JP_01,
    ...ZONE_NAMES_JP_02,
    ...ZONE_NAMES_JP_03,
  },
  pl: {
    ...ZONE_NAMES_PL_00,
    ...ZONE_NAMES_PL_01,
    ...ZONE_NAMES_PL_02,
  },
  ru: {
    ...ZONE_NAMES_RU_00,
    ...ZONE_NAMES_RU_01,
    ...ZONE_NAMES_RU_02,
    ...ZONE_NAMES_RU_03,
    ...ZONE_NAMES_RU_04,
  },
  zh: {
    ...ZONE_NAMES_ZH_00,
    ...ZONE_NAMES_ZH_01,
    ...ZONE_NAMES_ZH_02,
  },
}
