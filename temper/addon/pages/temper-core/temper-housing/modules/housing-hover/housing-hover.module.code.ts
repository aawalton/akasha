import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"

interface BackdropEntry {
  backDrop: BackdropControl
}

function asBackdropEntry(value: unknown): BackdropEntry {
  return value as BackdropEntry
}

function bdOnMouseEnter(this: void, index: number): undefined {
  const favorites = houseTravel.controls.favorites
  if (favorites !== undefined && index !== undefined && favorites[index] !== undefined) {
    const line = houseTravel.config.color.backDropLine
    const entry = asBackdropEntry(favorites[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, line.A)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
houseTravel.BdOnMouseEnter = bdOnMouseEnter

function bdOnMouseExit(this: void, index: number): undefined {
  const favorites = houseTravel.controls.favorites
  if (favorites !== undefined && index !== undefined && favorites[index] !== undefined) {
    const line = houseTravel.config.color.backDropLine
    const entry = asBackdropEntry(favorites[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, 0.0)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
houseTravel.BdOnMouseExit = bdOnMouseExit

function bdLibraryEntryOnMouseEnter(this: void, index: number): undefined {
  const libraryEntries = houseTravel.controls.libraryEntries
  if (libraryEntries !== undefined && index !== undefined && libraryEntries[index] !== undefined) {
    const line = houseTravel.config.color.backDropLine
    const entry = asBackdropEntry(libraryEntries[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, line.A)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
houseTravel.BdLibraryEntryOnMouseEnter = bdLibraryEntryOnMouseEnter

function bdLibraryEntryOnMouseExit(this: void, index: number): undefined {
  const libraryEntries = houseTravel.controls.libraryEntries
  if (libraryEntries !== undefined && index !== undefined && libraryEntries[index] !== undefined) {
    const line = houseTravel.config.color.backDropLine
    const entry = asBackdropEntry(libraryEntries[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, 0.0)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
houseTravel.BdLibraryEntryOnMouseExit = bdLibraryEntryOnMouseExit

function bdMyHousesOnMouseEnter(this: void, index: number): undefined {
  const purchasedHouses = houseTravel.controls.purchasedHouses
  if (
    purchasedHouses !== undefined &&
    index !== undefined &&
    purchasedHouses[index] !== undefined
  ) {
    const line = houseTravel.config.color.backDropLine
    const entry = asBackdropEntry(purchasedHouses[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, line.A)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
houseTravel.BdMyHousesOnMouseEnter = bdMyHousesOnMouseEnter

function bdMyHousesOnMouseExit(this: void, index: number): undefined {
  const purchasedHouses = houseTravel.controls.purchasedHouses
  if (
    purchasedHouses !== undefined &&
    index !== undefined &&
    purchasedHouses[index] !== undefined
  ) {
    const line = houseTravel.config.color.backDropLine
    const entry = asBackdropEntry(purchasedHouses[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, 0.0)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
houseTravel.BdMyHousesOnMouseExit = bdMyHousesOnMouseExit
