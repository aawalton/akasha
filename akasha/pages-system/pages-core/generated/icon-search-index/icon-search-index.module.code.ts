import { ICON_SEARCH_INDEX_00 } from "../entries-00/entries-00.module.code.ts"
import { ICON_SEARCH_INDEX_01 } from "../entries-01/entries-01.module.code.ts"
import { ICON_SEARCH_INDEX_02 } from "../entries-02/entries-02.module.code.ts"
import { ICON_SEARCH_INDEX_03 } from "../entries-03/entries-03.module.code.ts"
import { ICON_SEARCH_INDEX_04 } from "../entries-04/entries-04.module.code.ts"
import { ICON_SEARCH_INDEX_05 } from "../entries-05/entries-05.module.code.ts"
import { ICON_SEARCH_INDEX_06 } from "../entries-06/entries-06.module.code.ts"
import { ICON_SEARCH_INDEX_07 } from "../entries-07/entries-07.module.code.ts"
import { ICON_SEARCH_INDEX_08 } from "../entries-08/entries-08.module.code.ts"
import { ICON_SEARCH_INDEX_09 } from "../entries-09/entries-09.module.code.ts"
import { ICON_SEARCH_INDEX_10 } from "../entries-10/entries-10.module.code.ts"
import { ICON_SEARCH_INDEX_11 } from "../entries-11/entries-11.module.code.ts"
import { ICON_SEARCH_INDEX_12 } from "../entries-12/entries-12.module.code.ts"
import { ICON_SEARCH_INDEX_13 } from "../entries-13/entries-13.module.code.ts"
import { ICON_SEARCH_INDEX_14 } from "../entries-14/entries-14.module.code.ts"
import { ICON_SEARCH_INDEX_15 } from "../entries-15/entries-15.module.code.ts"
import { ICON_SEARCH_INDEX_16 } from "../entries-16/entries-16.module.code.ts"
import { ICON_SEARCH_INDEX_17 } from "../entries-17/entries-17.module.code.ts"
import { ICON_SEARCH_INDEX_18 } from "../entries-18/entries-18.module.code.ts"
import { ICON_SEARCH_INDEX_19 } from "../entries-19/entries-19.module.code.ts"
import { ICON_SEARCH_INDEX_20 } from "../entries-20/entries-20.module.code.ts"
import { ICON_SEARCH_INDEX_21 } from "../entries-21/entries-21.module.code.ts"
import { ICON_SEARCH_INDEX_22 } from "../entries-22/entries-22.module.code.ts"
import { ICON_SEARCH_INDEX_23 } from "../entries-23/entries-23.module.code.ts"
import { ICON_SEARCH_INDEX_24 } from "../entries-24/entries-24.module.code.ts"
import { ICON_SEARCH_INDEX_25 } from "../entries-25/entries-25.module.code.ts"
import { ICON_SEARCH_INDEX_26 } from "../entries-26/entries-26.module.code.ts"
import { ICON_SEARCH_INDEX_27 } from "../entries-27/entries-27.module.code.ts"
import { ICON_SEARCH_INDEX_28 } from "../entries-28/entries-28.module.code.ts"
import { ICON_SEARCH_INDEX_29 } from "../entries-29/entries-29.module.code.ts"
import { ICON_SEARCH_INDEX_30 } from "../entries-30/entries-30.module.code.ts"
import { ICON_SEARCH_INDEX_31 } from "../entries-31/entries-31.module.code.ts"
import { ICON_SEARCH_INDEX_32 } from "../entries-32/entries-32.module.code.ts"
import { ICON_SEARCH_INDEX_33 } from "../entries-33/entries-33.module.code.ts"
import { ICON_SEARCH_INDEX_34 } from "../entries-34/entries-34.module.code.ts"
import { ICON_SEARCH_INDEX_35 } from "../entries-35/entries-35.module.code.ts"
import { ICON_SEARCH_INDEX_36 } from "../entries-36/entries-36.module.code.ts"
import { ICON_SEARCH_INDEX_37 } from "../entries-37/entries-37.module.code.ts"
import { PASCAL_TO_KEBAB_00 } from "../pascal-to-kebab-00/pascal-to-kebab-00.module.code.ts"
import { PASCAL_TO_KEBAB_01 } from "../pascal-to-kebab-01/pascal-to-kebab-01.module.code.ts"
import { PASCAL_TO_KEBAB_02 } from "../pascal-to-kebab-02/pascal-to-kebab-02.module.code.ts"
import { PASCAL_TO_KEBAB_03 } from "../pascal-to-kebab-03/pascal-to-kebab-03.module.code.ts"
import { PASCAL_TO_KEBAB_04 } from "../pascal-to-kebab-04/pascal-to-kebab-04.module.code.ts"

export const ICON_SEARCH_INDEX = [
  ...ICON_SEARCH_INDEX_00,
  ...ICON_SEARCH_INDEX_01,
  ...ICON_SEARCH_INDEX_02,
  ...ICON_SEARCH_INDEX_03,
  ...ICON_SEARCH_INDEX_04,
  ...ICON_SEARCH_INDEX_05,
  ...ICON_SEARCH_INDEX_06,
  ...ICON_SEARCH_INDEX_07,
  ...ICON_SEARCH_INDEX_08,
  ...ICON_SEARCH_INDEX_09,
  ...ICON_SEARCH_INDEX_10,
  ...ICON_SEARCH_INDEX_11,
  ...ICON_SEARCH_INDEX_12,
  ...ICON_SEARCH_INDEX_13,
  ...ICON_SEARCH_INDEX_14,
  ...ICON_SEARCH_INDEX_15,
  ...ICON_SEARCH_INDEX_16,
  ...ICON_SEARCH_INDEX_17,
  ...ICON_SEARCH_INDEX_18,
  ...ICON_SEARCH_INDEX_19,
  ...ICON_SEARCH_INDEX_20,
  ...ICON_SEARCH_INDEX_21,
  ...ICON_SEARCH_INDEX_22,
  ...ICON_SEARCH_INDEX_23,
  ...ICON_SEARCH_INDEX_24,
  ...ICON_SEARCH_INDEX_25,
  ...ICON_SEARCH_INDEX_26,
  ...ICON_SEARCH_INDEX_27,
  ...ICON_SEARCH_INDEX_28,
  ...ICON_SEARCH_INDEX_29,
  ...ICON_SEARCH_INDEX_30,
  ...ICON_SEARCH_INDEX_31,
  ...ICON_SEARCH_INDEX_32,
  ...ICON_SEARCH_INDEX_33,
  ...ICON_SEARCH_INDEX_34,
  ...ICON_SEARCH_INDEX_35,
  ...ICON_SEARCH_INDEX_36,
  ...ICON_SEARCH_INDEX_37,
] as const

export type IconName = (typeof ICON_SEARCH_INDEX)[number]["name"]

export const ICON_NAMES: readonly IconName[] = ICON_SEARCH_INDEX.map((e) => e.name)

export const PASCAL_TO_KEBAB: Readonly<Record<string, IconName>> = {
  ...PASCAL_TO_KEBAB_00,
  ...PASCAL_TO_KEBAB_01,
  ...PASCAL_TO_KEBAB_02,
  ...PASCAL_TO_KEBAB_03,
  ...PASCAL_TO_KEBAB_04,
}
