import {
  PINS_BOOKSHELF,
  PINS_COLLECTED,
  PINS_EIDETIC,
  PINS_EIDETIC_COLLECTED,
  PINS_UNKNOWN,
} from "../lorebooks-constants/lorebooks-constants.module.code.ts"
import {
  filterDefault,
  filterValue,
} from "../lorebooks-filter-flags/lorebooks-filter-flags.module.code.ts"
import { getSavedVariables } from "../lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"

const LMP = LibMapPins

export function addMapPinFilterOptions(this: void, optionsTable: unknown[]): undefined {
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_UNKNOWN),
    tooltip: GetString(LBOOKS_UNKNOWN_DESC),
    getFunc: (): boolean => filterValue(PINS_UNKNOWN),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_UNKNOWN] = shown
      LMP.SetEnabled(PINS_UNKNOWN, shown)
    },
    default: filterDefault(PINS_UNKNOWN),
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_COLLECTED),
    tooltip: GetString(LBOOKS_COLLECTED_DESC),
    getFunc: (): boolean => filterValue(PINS_COLLECTED),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_COLLECTED] = shown
      LMP.SetEnabled(PINS_COLLECTED, shown)
    },
    default: filterDefault(PINS_COLLECTED),
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_EIDETIC),
    tooltip: GetString(LBOOKS_EIDETIC_DESC),
    getFunc: (): boolean => filterValue(PINS_EIDETIC),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_EIDETIC] = shown
      LMP.SetEnabled(PINS_EIDETIC, shown)
    },
    default: filterDefault(PINS_EIDETIC),
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_EIDETIC_COLLECTED),
    tooltip: GetString(LBOOKS_EIDETIC_COLLECTED_DESC),
    getFunc: (): boolean => filterValue(PINS_EIDETIC_COLLECTED),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_EIDETIC_COLLECTED] = shown
      LMP.SetEnabled(PINS_EIDETIC_COLLECTED, shown)
    },
    default: filterDefault(PINS_EIDETIC_COLLECTED),
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_BOOKSHELF_NAME),
    tooltip: GetString(LBOOKS_BOOKSHELF_DESC),
    getFunc: (): boolean => filterValue(PINS_BOOKSHELF),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_BOOKSHELF] = shown
      LMP.SetEnabled(PINS_BOOKSHELF, shown)
    },
    default: filterDefault(PINS_BOOKSHELF),
  } satisfies LamCheckboxData
}
