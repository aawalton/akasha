// DO NOT EDIT — regenerate with: ops page icon-search-index generate
// Source: https://github.com/lucide-icons/lucide (tag 0.576.0)
//
// The index itself is emitted in shards under ./icon-search-index/, because whole it is
// far past the length akasha will hold a file at. This barrel puts it back together and
// is the only module anything imports.

import { ICON_SEARCH_INDEX_00 } from "./icon-search-index/entries-00.generated"
import { ICON_SEARCH_INDEX_01 } from "./icon-search-index/entries-01.generated"
import { ICON_SEARCH_INDEX_02 } from "./icon-search-index/entries-02.generated"
import { ICON_SEARCH_INDEX_03 } from "./icon-search-index/entries-03.generated"
import { ICON_SEARCH_INDEX_04 } from "./icon-search-index/entries-04.generated"
import { ICON_SEARCH_INDEX_05 } from "./icon-search-index/entries-05.generated"
import { ICON_SEARCH_INDEX_06 } from "./icon-search-index/entries-06.generated"
import { ICON_SEARCH_INDEX_07 } from "./icon-search-index/entries-07.generated"
import { ICON_SEARCH_INDEX_08 } from "./icon-search-index/entries-08.generated"
import { ICON_SEARCH_INDEX_09 } from "./icon-search-index/entries-09.generated"
import { ICON_SEARCH_INDEX_10 } from "./icon-search-index/entries-10.generated"
import { ICON_SEARCH_INDEX_11 } from "./icon-search-index/entries-11.generated"
import { ICON_SEARCH_INDEX_12 } from "./icon-search-index/entries-12.generated"
import { ICON_SEARCH_INDEX_13 } from "./icon-search-index/entries-13.generated"
import { ICON_SEARCH_INDEX_14 } from "./icon-search-index/entries-14.generated"
import { ICON_SEARCH_INDEX_15 } from "./icon-search-index/entries-15.generated"
import { ICON_SEARCH_INDEX_16 } from "./icon-search-index/entries-16.generated"
import { ICON_SEARCH_INDEX_17 } from "./icon-search-index/entries-17.generated"
import { ICON_SEARCH_INDEX_18 } from "./icon-search-index/entries-18.generated"
import { ICON_SEARCH_INDEX_19 } from "./icon-search-index/entries-19.generated"
import { ICON_SEARCH_INDEX_20 } from "./icon-search-index/entries-20.generated"
import { ICON_SEARCH_INDEX_21 } from "./icon-search-index/entries-21.generated"
import { ICON_SEARCH_INDEX_22 } from "./icon-search-index/entries-22.generated"
import { ICON_SEARCH_INDEX_23 } from "./icon-search-index/entries-23.generated"
import { ICON_SEARCH_INDEX_24 } from "./icon-search-index/entries-24.generated"
import { ICON_SEARCH_INDEX_25 } from "./icon-search-index/entries-25.generated"
import { PASCAL_TO_KEBAB_00 } from "./icon-search-index/pascal-to-kebab-00.generated"
import { PASCAL_TO_KEBAB_01 } from "./icon-search-index/pascal-to-kebab-01.generated"
import { PASCAL_TO_KEBAB_02 } from "./icon-search-index/pascal-to-kebab-02.generated"
import { PASCAL_TO_KEBAB_03 } from "./icon-search-index/pascal-to-kebab-03.generated"
import { PASCAL_TO_KEBAB_04 } from "./icon-search-index/pascal-to-kebab-04.generated"

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
] as const

export type IconName = (typeof ICON_SEARCH_INDEX)[number]["name"]

export const ICON_NAMES: readonly IconName[] = ICON_SEARCH_INDEX.map((e) => e.name)

/** Maps lucide-react PascalCase export names (`FileText`, `Trash2`, `ArrowDown01`) to
 *  their canonical kebab-case name (`file-text`, `trash-2`, `arrow-down-0-1`).
 *  Needed because kebab→PascalCase is ambiguous for multi-digit names (e.g. `Clock10`
 *  vs `ArrowDown01`). */
export const PASCAL_TO_KEBAB: Readonly<Record<string, IconName>> = {
  ...PASCAL_TO_KEBAB_00,
  ...PASCAL_TO_KEBAB_01,
  ...PASCAL_TO_KEBAB_02,
  ...PASCAL_TO_KEBAB_03,
  ...PASCAL_TO_KEBAB_04,
}
