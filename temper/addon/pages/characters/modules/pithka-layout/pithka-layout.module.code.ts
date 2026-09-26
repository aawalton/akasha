import { ICON_SIZE } from "akasha/temper/addon/pages/characters/modules/pithka-constants/pithka-constants.module.code.ts"
import {
  newLabel,
  setWindowDimensions,
  setWindowTitle,
} from "akasha/temper/addon/pages/characters/modules/pithka-controls/pithka-controls.module.code.ts"
import "akasha/temper/addon/pages/characters/pithka-declarations/pithka-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"

export function spacer(this: void, width: number): LabelControl {
  const control = newLabel()
  control.SetDimensions(width, ICON_SIZE)
  control.SetHidden(true)
  return control
}

export type Grid = {
  readonly addRow: (this: void, objects: readonly Control[]) => undefined
  readonly setHidden: (this: void, hidden: boolean) => undefined
}

export function createGrid(
  this: void,
  xOffset: number,
  yOffset: number,
  relativeTo: Control = TemperCharactersPithka_GUI,
  alignment: number = TOPLEFT
): Grid {
  const rows: Control[][] = []
  const anchor = newLabel()
  anchor.SetDimensions(1, 1)
  anchor.SetAnchor(alignment, relativeTo, alignment, xOffset, yOffset)
  let prevRow: Control = anchor
  return {
    addRow: (objects) => {
      const row: Control[] = []
      for (const object of objects) {
        const previous = row[row.length - 1]
        if (previous === undefined) {
          object.SetAnchor(TOPLEFT, prevRow, BOTTOMLEFT, 0, 3)
          prevRow = object
        } else {
          object.SetAnchor(LEFT, previous, RIGHT, 3, 0)
        }
        row.push(object)
      }
      rows.push(row)
      return undefined
    },
    setHidden: (hidden) => {
      for (const row of rows) {
        for (const object of row) object.SetHidden(hidden)
      }
      return undefined
    },
  }
}

export type Screen = {
  readonly navIconTexture: string
  readonly title: string
  readonly EnsureInitialized: (this: void) => undefined
  readonly setHidden: (this: void, isHidden: boolean) => undefined
  readonly addObject: (this: void, object: Grid) => undefined
}

export function createScreen(
  this: void,
  navIconTexture: string,
  width: number,
  height: number,
  title: string,
  populate: (this: void, screen: Screen) => undefined
): Screen {
  const objects: Grid[] = []
  let isHidden = true
  let isInitialized = false
  const screen: Screen = {
    navIconTexture,
    title,
    EnsureInitialized: () => {
      if (isInitialized) return undefined
      populate(screen)
      isInitialized = true
      return undefined
    },
    setHidden: (hidden) => {
      isHidden = hidden
      for (const object of objects) object.setHidden(hidden)
      if (!hidden) {
        setWindowDimensions(width, height)
        setWindowTitle(title)
      }
      return undefined
    },
    addObject: (object) => {
      objects.push(object)
      return object.setHidden(isHidden)
    },
  }
  return screen
}
