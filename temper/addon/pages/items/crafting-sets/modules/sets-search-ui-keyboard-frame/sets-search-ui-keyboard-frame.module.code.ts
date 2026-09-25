import { frameWindow } from "akasha/temper/window/modules/window-frame/window-frame.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const SEARCH_TITLE = "Set Search"

const ACTION_GAP = 8

const HEADER_ACTIONS: readonly string[] = ["ButtonSearch", "ButtonReset", "ButtonSettings"]

export function frameSearchWindow(
  this: void,
  name: string,
  onClose: (this: void) => undefined
): undefined {
  const window = WINDOW_MANAGER.GetControlByName<TopLevelWindow>(name)
  const filters = WINDOW_MANAGER.GetControlByName(`${name}Filters`)
  const content = WINDOW_MANAGER.GetControlByName(`${name}Content`)
  if (window === undefined || filters === undefined || content === undefined) return undefined
  const { body, actions } = frameWindow(window, SEARCH_TITLE, onClose)
  filters.ClearAnchors()
  filters.SetAnchor(TOPLEFT, body, TOPLEFT, 0, 0)
  filters.SetAnchor(TOPRIGHT, body, TOPRIGHT, 0, 0)
  content.ClearAnchors()
  content.SetAnchor(TOPLEFT, filters, BOTTOMLEFT, 0, 0)
  content.SetAnchor(BOTTOMRIGHT, body, BOTTOMRIGHT, 0, 0)
  let previous: Control = actions
  let edge = RIGHT
  let gap = 0
  for (const suffix of HEADER_ACTIONS) {
    const action = WINDOW_MANAGER.GetControlByName(`${name}${suffix}`)
    if (action === undefined) continue
    action.ClearAnchors()
    action.SetAnchor(RIGHT, previous, edge, -gap, 0)
    previous = action
    edge = LEFT
    gap = ACTION_GAP
  }
  return undefined
}
