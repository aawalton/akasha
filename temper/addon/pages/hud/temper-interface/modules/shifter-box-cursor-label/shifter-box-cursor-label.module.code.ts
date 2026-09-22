import { ShifterBoxProto } from "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-box-class/shifter-box-class.module.code.ts"
import {
  asLabelControl,
  asString,
} from "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-casts/shifter-casts.module.code.ts"
import { DEFAULT_LIST_SETTINGS } from "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-constants/shifter-constants.module.code.ts"
import { getCursorTLC } from "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-drag-helpers/shifter-drag-helpers.module.code.ts"
import { CURSOR_STATE } from "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-state/shifter-state.module.code.ts"
import type { ShifterBox } from "akasha/temper/addon/pages/hud/temper-interface/modules/shifter-types/shifter-types.module.code.ts"
import "akasha/temper/addon/pages/lib-custom-menu/custom-menu-declarations/custom-menu-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-fonts/eso-fonts.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

ShifterBoxProto.UpdateCursorTLC = function (
  this: ShifterBox,
  isHidden: boolean,
  _draggedControl?: Control
): undefined {
  if (CURSOR_STATE.tlc === undefined) getCursorTLC()
  const cursorTlc = CURSOR_STATE.tlc
  if (cursorTlc === undefined) return
  const label = asLabelControl(cursorTlc.label)
  cursorTlc.ClearAnchors()
  label.ClearAnchors()
  const draggedData = this.currentDragData
  if (!isHidden && draggedData !== undefined) {
    const minLabelHeight = DEFAULT_LIST_SETTINGS.rowHeight
    const maxLabelWidth = 400
    const maxLabelHeight = 80

    cursorTlc.shifterBox = this
    cursorTlc.SetResizeToFitDescendents(true)

    const draggedControlText = draggedData._draggedText
    const draggedAdditionalText = draggedData._draggedAdditionalText
    const draggedAdditionalTextIsGiven =
      draggedAdditionalText !== undefined && draggedAdditionalText !== ""
    let textForLabel: unknown = draggedControlText
    let textWidth = GetStringWidthScaledPixels(ZoFontGame, asString(draggedControlText), 1) + 2
    const textWidthAdditionalText = draggedAdditionalTextIsGiven
      ? GetStringWidthScaledPixels(ZoFontGame, asString(draggedAdditionalText), 1) + 2
      : 0
    if (draggedAdditionalTextIsGiven && textWidthAdditionalText > 0) {
      if (textWidthAdditionalText > textWidth) {
        textWidth = textWidthAdditionalText
      }
      textForLabel = `${asString(draggedControlText)}\n${asString(draggedAdditionalText)}`
    }
    const textHeight = draggedAdditionalTextIsGiven ? 2 * minLabelHeight : minLabelHeight

    label.SetText(asString(textForLabel))
    label.SetWidth(textWidth)
    label.SetHeight(textHeight)
    cursorTlc.SetWidth(textWidth)
    cursorTlc.SetHeight(textHeight)

    let [width, height] = label.GetDimensions()
    if (width > maxLabelWidth) width = maxLabelWidth
    if (height > maxLabelHeight) height = maxLabelHeight

    cursorTlc.SetDimensionConstraints(width, height, maxLabelWidth, maxLabelHeight)
    cursorTlc.SetDrawTier(DT_HIGH)
    cursorTlc.SetDrawLayer(DL_OVERLAY)
    cursorTlc.SetDrawLevel(5)
    cursorTlc.SetAlpha(0.8)

    const offsetX = draggedData._isFromLeftList === true ? 10 : 35
    cursorTlc.SetAnchor(LEFT, GuiMouse, RIGHT, offsetX, 0)
    label.SetAnchor(TOPLEFT, cursorTlc, TOPLEFT, 0, 0)
    label.SetAnchor(BOTTOMRIGHT, cursorTlc, BOTTOMRIGHT, 0, 0)
  } else {
    cursorTlc.shifterBox = undefined
    cursorTlc.SetDimensions(0, 0)
    label.SetText("")
    cursorTlc.SetDrawTier(DT_LOW)
    cursorTlc.SetDrawLayer(DL_BACKGROUND)
    cursorTlc.SetDrawLevel(0)
    cursorTlc.SetAlpha(0)
  }
  cursorTlc.SetHidden(isHidden)
  cursorTlc.SetMouseEnabled(false)
}
