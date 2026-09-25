import { closeBlueprintWindow } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-blueprint-furnisher/craft-blueprint-furnisher.module.code.ts"
import { closeRecipeWindow } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-recipe-cooking/craft-recipe-cooking.module.code.ts"
import { closeStyle } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-style-tracking/craft-style-tracking.module.code.ts"
import { styleCraftText } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-text-style/craft-text-style.module.code.ts"
import { controlCloseAll } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-ui-updates/craft-ui-updates.module.code.ts"
import type { SurfaceLevel } from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import {
  styleControlsUnder,
  styleTab,
} from "akasha/temper/window/modules/window-controls/window-controls.module.code.ts"
import {
  FRAME_PADDING,
  FRAME_TOP,
  frameWindow,
} from "akasha/temper/window/modules/window-frame/window-frame.module.code.ts"
import {
  clearBackdrop,
  paintPanel,
} from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const STYLE_TITLE = "Styles"

const RECIPE_TITLE = "Recipes"

const BLUEPRINT_TITLE = "Blueprints"

const RUNE_TITLE = "Enchanting"

const RUNE_MARGIN = 11

const COOK_TITLE = "Provisioning"

const COOK_MARGIN = 10

const PANEL_LEVEL: SurfaceLevel = 2

const SECTIONS: readonly string[] = [
  "TopSection",
  "Panel",
  "Header",
  "SearchAmount",
  "InfoSection",
  "FoodSection",
  "GlyphSection",
]

const CLEARED: readonly string[] = ["GlyphDivider", "RefineAllButtonBG"]

const LONE_TABS: readonly string[] = ["RefineAllButton"]

function panelSections(this: void, root: Control): undefined {
  for (const name of SECTIONS) {
    const section = GetControl<BackdropControl>(root, name)
    if (section !== undefined) paintPanel(section)
  }
  for (const name of CLEARED) {
    const cleared = GetControl<BackdropControl>(root, name)
    if (cleared !== undefined) clearBackdrop(cleared)
  }
  for (const name of LONE_TABS) {
    const tab = GetControl(root, name)
    if (tab !== undefined) styleTab(tab)
  }
  styleControlsUnder(root, PANEL_LEVEL)
  return undefined
}

function frameCraftWindow(
  this: void,
  window: TopLevelWindow,
  content: Control,
  titled: string,
  onClose: (this: void) => undefined
): undefined {
  panelSections(content)
  const { body } = frameWindow(window, titled, onClose)
  content.ClearAnchors()
  content.SetAnchor(TOPLEFT, body, TOPLEFT, 0, 0)
  window.SetDimensions(
    content.GetWidth() + FRAME_PADDING * 2,
    content.GetHeight() + FRAME_TOP + FRAME_PADDING
  )
  return undefined
}

function frameStationWindow(
  this: void,
  window: TopLevelWindow,
  first: Control,
  margin: number,
  titled: string
): undefined {
  panelSections(window)
  const { body } = frameWindow(window, titled)
  first.ClearAnchors()
  first.SetAnchor(TOPLEFT, body, TOPLEFT, 0, 0)
  const [width, height] = window.GetDimensions()
  window.SetDimensions(
    width - margin * 2 + FRAME_PADDING * 2,
    height - margin * 2 + FRAME_TOP + FRAME_PADDING
  )
  return undefined
}

const MAIN_TITLE = "Crafting"

const MAIN_MARGIN_X = 11

const MAIN_MARGIN_TOP = 37

const ACTION_GAP = 8

const MAIN_CHROME: readonly string[] = [
  "BG",
  "Headline",
  "CloseButton",
  "OptionButton",
  "QuestButton",
]

const LEFT_SIDE: readonly number[] = [TOPLEFT, LEFT, BOTTOMLEFT]

const RIGHT_SIDE: readonly number[] = [TOPRIGHT, RIGHT, BOTTOMRIGHT]

const TOP_SIDE: readonly number[] = [TOPLEFT, TOP, TOPRIGHT]

const BOTTOM_SIDE: readonly number[] = [BOTTOMLEFT, BOTTOM, BOTTOMRIGHT]

function shiftOf(
  this: void,
  side: number,
  first: readonly number[],
  last: readonly number[],
  by: number
): number {
  if (first.includes(side)) return by
  if (last.includes(side)) return last === RIGHT_SIDE ? -by : 0
  return last === RIGHT_SIDE ? 0 : by / 2
}

function shiftContent(this: void, window: Control, across: number, down: number): undefined {
  const chrome = MAIN_CHROME.map((name) => GetControl(window, name))
  for (let at = 1; at <= window.GetNumChildren(); at += 1) {
    const child = window.GetChild<Control>(at)
    if (child === undefined || chrome.includes(child)) continue
    const anchors: [number, Control | undefined, number, number, number][] = []
    for (const index of [0, 1]) {
      const [valid, point, relativeTo, relativePoint, x, y] = child.GetAnchor(index)
      if (!valid) continue
      if (relativeTo !== window) {
        anchors.push([point, relativeTo, relativePoint, x, y])
        continue
      }
      anchors.push([
        point,
        relativeTo,
        relativePoint,
        x + shiftOf(relativePoint, LEFT_SIDE, RIGHT_SIDE, across),
        y + shiftOf(relativePoint, TOP_SIDE, BOTTOM_SIDE, down),
      ])
    }
    child.ClearAnchors()
    for (const [point, relativeTo, relativePoint, x, y] of anchors) {
      child.SetAnchor(point, relativeTo, relativePoint, x, y)
    }
  }
  return undefined
}

function frameMainPanel(this: void, window: TopLevelWindow): undefined {
  const across = FRAME_PADDING - MAIN_MARGIN_X
  const down = FRAME_TOP - MAIN_MARGIN_TOP
  shiftContent(window, across, down)
  const [width, height] = window.GetDimensions()
  window.SetDimensions(width + across * 2, height + down)
  for (const name of ["BG", "Headline", "CloseButton"]) GetControl(window, name)?.SetHidden(true)
  styleCraftText(window)
  panelSections(window)
  const { actions } = frameWindow(window, MAIN_TITLE, () => controlCloseAll())
  const option = GetControl(window, "OptionButton")
  const quest = GetControl(window, "QuestButton")
  if (option !== undefined) {
    option.ClearAnchors()
    option.SetAnchor(RIGHT, actions, RIGHT, 0, 0)
    if (quest !== undefined) {
      quest.ClearAnchors()
      quest.SetAnchor(RIGHT, option, LEFT, -ACTION_GAP, 0)
    }
  }
  return undefined
}

export function frameCraftWindows(this: void): undefined {
  frameMainPanel(TemperItemsCrafting_Panel)
  frameStationWindow(
    TemperItemsCrafting_Rune,
    TemperItemsCrafting_RuneHeader,
    RUNE_MARGIN,
    RUNE_TITLE
  )
  const cookTop = GetControl(TemperItemsCrafting_Cook, "TopSection")
  if (cookTop !== undefined) {
    frameStationWindow(TemperItemsCrafting_Cook, cookTop, COOK_MARGIN, COOK_TITLE)
  }
  frameCraftWindow(TemperItemsCrafting_Style_Window, TemperItemsCrafting_Style, STYLE_TITLE, () =>
    closeStyle()
  )
  frameCraftWindow(
    TemperItemsCrafting_Recipe_Window,
    TemperItemsCrafting_Recipe,
    RECIPE_TITLE,
    () => closeRecipeWindow()
  )
  frameCraftWindow(
    TemperItemsCrafting_Blueprint_Window,
    TemperItemsCrafting_Blueprint,
    BLUEPRINT_TITLE,
    () => closeBlueprintWindow()
  )
  return undefined
}
