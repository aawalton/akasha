import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import {
  clearBackdrop,
  paintRowState,
} from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"

interface BackdropEntry {
  backDrop: BackdropControl
}

function asBackdropEntry(value: unknown): BackdropEntry {
  return value as BackdropEntry
}

function lightEntry(
  this: void,
  entries: readonly unknown[] | undefined,
  index: number,
  over: boolean
): undefined {
  const held: unknown = entries?.[index]
  if (held === undefined) return undefined
  paintRowState(clearBackdrop(asBackdropEntry(held).backDrop), over ? "hover" : "rest")
  return undefined
}

houseTravel.BdOnMouseEnter = (index: number) =>
  lightEntry(houseTravel.controls.favorites, index, true)
houseTravel.BdOnMouseExit = (index: number) =>
  lightEntry(houseTravel.controls.favorites, index, false)
houseTravel.BdLibraryEntryOnMouseEnter = (index: number) =>
  lightEntry(houseTravel.controls.libraryEntries, index, true)
houseTravel.BdLibraryEntryOnMouseExit = (index: number) =>
  lightEntry(houseTravel.controls.libraryEntries, index, false)
houseTravel.BdMyHousesOnMouseEnter = (index: number) =>
  lightEntry(houseTravel.controls.purchasedHouses, index, true)
houseTravel.BdMyHousesOnMouseExit = (index: number) =>
  lightEntry(houseTravel.controls.purchasedHouses, index, false)
