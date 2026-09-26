import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export interface FormatWithText {
  info: number
  text: string
}

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    format: Record<number, number | FormatWithText>
    GetFormatInfo: (
      this: void,
      abilityId: number
    ) => LuaMultiReturn<
      [
        customTime: number,
        customColor: string | undefined,
        hideTimer: number,
        alertType: number,
        resultFilter: number,
        dingInIA: number,
        customText: string | undefined,
      ]
    >
  }
}

const C = CRUTCH.Constants

CRUTCH.format = {
  185805: 700,
  193331: 700,
  183122: 700,
  193397: 700,
  186366: 700,
  193398: 700,
  183537: 700,
  198309: 700,
  186193: 700,
  198330: 700,
  186200: 700,
  198537: 700,
  63029: 900,
  63044: 900,
  63046: 900,
  20930: 100,
  58864: 300,
  33208: 500,
  47898: 10,
  48240: 10,
  49098: 10,
  95545: 20206.2,
  103531: 100106.6,
  110431: 100106.6,
  105239: 200010,
  103555: 400,
  104019: 31003,
  103946: 500,
  105291: 600,
  166522: 100,
  166525: 100,
  168525: 100,
  166527: 400,
  166529: 400,
  168526: 400,
  163987: 500,
  166353: 400,
  163952: 800,
  91019: 430,
  94736: 500,
  94757: 500,
  133515: 100204.5,
  133559: 200,
  136873: 300,
  134050: 30400,
  134196: 500,
  140606: 100,
  134023: 100,
  140941: 400,
  140944: 400,
  132571: 20504.15,
  214203: 500,
  214187: 500,
  214136: 500,
  219420: 300,
  222071: 400,
  214138: 520.1,
  218285: 800,
  223331: 800,
  222609: 800,
  215107: 408.8,
  214355: 400,
  75507: 1601.1,
  73250: 315,
  256383: 500,
  256579: 500,
  256483: 500,
  236751: 1505,
  237149: 500,
  235201: 500,
  232773: 500,
  232779: 400,
  232780: 400,
  233598: 300,
  233610: 300,
  232397: 500,
  236569: 500,
  238800: 800,
  234276: 1105,
  234000: 1405,
  234150: 100,
  234076: 400,
  233330: 30500,
  233321: 30500,
  236871: 300,
  236381: 30500,
  234704: 300,
  233452: 300,
  233477: 300,
  234722: 300,
  233466: 300,
  233489: 300,
  234683: {
    info: 31103,
    text: "Blazing Flame Atronach",
  },
  234680: {
    info: 31403,
    text: "Sparking Cold-Flame Atronach",
  },
  [C.ID.SEEKING_SURGE_DROPPED]: 31503,
  245208: 20503,
  152688: 2.5,
  157860: 1000,
  150008: 30000,
  149089: 500,
  157466: 30800,
  153517: {
    info: 1110,
    text: "Clockwise |t100%:100%:esoui/art/housing/rotation_arrow_reverse.dds:inheritcolor|t",
  },
  153518: {
    info: 1210,
    text: "Counter-Clockwise|t100%:100%:esoui/art/housing/rotation_arrow.dds:inheritcolor|t",
  },
  56857: 200,
  54125: 100205.7,
  56782: 800,
  183855: 45,
  199344: 100,
  184802: 30500,
  183778: 1103,
  122012: 130402.5,
  120890: 130302.5,
  120359: 20403.1,
  121722: 6.3,
  120783: 330000.0,
  118884: 100.0,
  117251: 100.0,
  121436: 500,
  121422: 300,
  121411: 600,
  207005: 200001.4,
  240426: 800,
  240363: 500,
  241689: 30200,
  241662: 100,
  241685: 20200,
  241854: 500,
  241863: 500,
  241326: 500,
  241327: 500,
  241328: 500,
  241329: 500,
  241224: 500,
  240665: 400,
  246168: 204.3,
  163153: 600,
  113173: 300,
  172410: 200003.3,
  171742: 500,
  224463: 1102,
  230349: 1102,
  224473: 1402,
  230383: 1402,
  224476: 1402,
  230386: 1402,
  223935: 500,
  98809: 500,
  97022: 500,
  96826: 100400,
  226181: 200,
  229247: 800,
  233821: 100,
  224822: 100,
  265060: 300,
  267268: 300,
  242063: 100,
  168314: 1505,
  163654: 500,
  164480: 300,
  182334: 105.3,
  182393: 14.5,
  254918: 500,
  251465: 300,
  250487: 500,
  250667: 100400,
  250668: 200,
  252712: 300,
  252715: 300,
  111283: 2,
  52773: 400,
  54841: 400,
  195448: 501.1,
  192013: 500,
  192024: 500,
  210841: 500,
  210830: 500,
  195816: 500,
  196848: 500,
  202374: 500,
  193530: 500,
  196251: 500,
  198099: 500,
  197002: 500,
  196959: 500,
  196875: 500,
  220298: 500,
  227461: 500,
  223378: 500,
  209981: 100,
  209963: 100,
  192517: 1500,
  47481: 2000500,
  196235: 2000500,
  221792: 2001503,
  227772: {
    info: 110,
    text: GetAbilityName(211987),
  },
  196689: 200,
  221745: 100,
  194984: 1000300,
  196715: 1000300,
  211594: 1000300,
  221216: 1000300,
  47488: 300,
  203006: 300,
  201727: 300,
  203492: 300,
  199608: 300,
  202383: 300,
  191702: 300,
  223685: 300,
  193534: 300,
  209645: 300,
  72057: 20003,
  70723: 1203,
  72446: 400,
  68194: 14,
  9674: 300,
  29378: 300,
  17867: 400,
  4817: 300,
  70955: 200,
  35164: 800,
  70695: 500,
  68994: 500,
  69029: 500,
  69083: 500,
  71849: 100,
  67411: 300,
  67420: 500,
  69001: 500,
  68011: 500,
}

const COLORS: Record<number, string> = {
  1: "ff6600",
  2: "64c200",
  3: "fff1ab",
  4: "8ef5f5",
  5: "ff00ff",
  6: "9447ff",
  7: "3fe02a",
  8: "9999ff",
  9: "ffe736",
}

CRUTCH.GetFormatInfo = function (this: void, abilityId) {
  const entry = CRUTCH.format[abilityId]
  let remainder: number | undefined
  let customText: string | undefined
  if (typeof entry === "object") {
    customText = entry.text
    remainder = entry.info
  } else {
    remainder = entry
  }

  if (remainder === undefined) {
    remainder = 0
  }

  const dingInIA = math.floor(remainder / 1000000)
  remainder = remainder - dingInIA * 1000000

  const resultFilter = math.floor(remainder / 100000)
  remainder = remainder - resultFilter * 100000

  const alertType = math.floor(remainder / 10000)
  remainder = remainder - alertType * 10000

  const hideTimer = math.floor(remainder / 1000)
  remainder = remainder - hideTimer * 1000

  const color = math.floor(remainder / 100)
  remainder = remainder - color * 100

  return $multi(
    remainder * 1000,
    COLORS[color],
    hideTimer,
    alertType,
    resultFilter,
    dingInIA,
    customText
  )
}
