import {
  asControl,
  asLabelControl,
  asNumber,
  asRowData,
  asScrollDataList,
  asString,
  asTableKey,
} from "../shifter-casts/shifter-casts.module.code.ts"
import {
  FONT_STYLE,
  FONT_WEIGHT,
  RESELECTING_DURING_REBUILD,
  SCROLLBAR_WIDTH,
} from "../shifter-constants/shifter-constants.module.code.ts"
import {
  fireCallback,
  getShallowClonedTable,
} from "../shifter-helpers/shifter-helpers.module.code.ts"
import { ShifterBoxListProto } from "../shifter-list-class/shifter-list-class.module.code.ts"
import { lib } from "../shifter-state/shifter-state.module.code.ts"
import type { RowData, ShifterBoxList } from "../shifter-types/shifter-types.module.code.ts"

ShifterBoxListProto.SetupRowEntry = function (
  this: ShifterBoxList,
  rowControl: Control,
  rowData: RowData,
  doNotSetupRowNow?: boolean
): undefined {
  const setupNow = doNotSetupRowNow ?? false

  const onRowMouseEnter = (...args: unknown[]): undefined => {
    const pRowControl = asControl(args[0])
    if (this.enabled) {
      fireCallback(
        this.shifterBox,
        pRowControl,
        this.isLeftList
          ? lib.EVENT_LEFT_LIST_ROW_ON_MOUSE_ENTER
          : lib.EVENT_RIGHT_LIST_ROW_ON_MOUSE_ENTER,
        this.shifterBox,
        rowData
      )
      if (this.listBoxSettings.rowOnMouseEnter !== undefined) {
        this.listBoxSettings.rowOnMouseEnter(pRowControl)
      } else {
        const labelControl = asLabelControl(pRowControl.GetNamedChild("Label"))
        const textWidth = labelControl.GetTextWidth()
        const desiredWidth = labelControl.GetDesiredWidth()
        const wasTruncated = asLabelControl(pRowControl.GetNamedChild("Label")).WasTruncated()
        if (wasTruncated || textWidth + SCROLLBAR_WIDTH > desiredWidth) {
          const data = asRowData(ZO_ScrollList_GetData(pRowControl))
          ZO_Tooltips_ShowTextTooltip(pRowControl, TOP, asString(data.value))
        }
      }
    }
  }
  const onRowMouseExit = (...args: unknown[]): undefined => {
    const pRowControl = asControl(args[0])
    if (this.enabled) {
      fireCallback(
        this.shifterBox,
        pRowControl,
        this.isLeftList
          ? lib.EVENT_LEFT_LIST_ROW_ON_MOUSE_EXIT
          : lib.EVENT_RIGHT_LIST_ROW_ON_MOUSE_EXIT,
        this.shifterBox,
        rowData
      )
      if (this.listBoxSettings.rowOnMouseExit !== undefined) {
        this.listBoxSettings.rowOnMouseExit(pRowControl)
      } else {
        ZO_Tooltips_HideTextTooltip()
      }
    }
  }
  const onRowMouseUp = (...args: unknown[]): undefined => {
    const pRowControl = asControl(args[0])
    const mouseButton = args[1]
    const isInside = args[2]
    const ctrlKey = args[3]
    const altKey = args[4]
    const shiftKey = args[5]
    const commandKey = args[6]
    if (this.enabled) {
      fireCallback(
        this.shifterBox,
        pRowControl,
        this.isLeftList
          ? lib.EVENT_LEFT_LIST_ROW_ON_MOUSE_UP
          : lib.EVENT_RIGHT_LIST_ROW_ON_MOUSE_UP,
        this.shifterBox,
        mouseButton,
        isInside,
        ctrlKey,
        altKey,
        shiftKey,
        commandKey,
        rowData
      )
      if (isInside !== true) return
      if (mouseButton === MOUSE_BUTTON_INDEX_LEFT) {
        const data = asRowData(ZO_ScrollList_GetData(pRowControl))
        this.ToggleEntrySelection(data, pRowControl, RESELECTING_DURING_REBUILD, false)
      } else if (mouseButton === MOUSE_BUTTON_INDEX_RIGHT) {
        if (this.listBoxSettings.rowOnMouseRightClick !== undefined) {
          const data = asRowData(ZO_ScrollList_GetData(pRowControl))
          this.listBoxSettings.rowOnMouseRightClick(pRowControl, data)
        }
      }
    }
  }
  const onDragStart = (...args: unknown[]): undefined => {
    const pRowControl = asControl(args[0])
    const mouseButton = args[1]
    if (this.enabled) {
      this.StartDragging(pRowControl, asNumber(mouseButton))
    }
  }
  const labelControl = asLabelControl(rowControl.GetNamedChild("Label"))
  labelControl.SetText(asString(rowData.value))
  rowControl.SetHandler("OnMouseEnter", onRowMouseEnter)
  rowControl.SetHandler("OnMouseExit", onRowMouseExit)
  rowControl.SetHandler("OnMouseUp", onRowMouseUp)
  if (this.shifterBoxSettings.dragDropEnabled) {
    rowControl.SetHandler("OnDragStart", onDragStart)
  }

  const listBoxSettings = this.listBoxSettings
  rowControl.SetHeight(listBoxSettings.rowHeight)
  rowControl.SetWidth(this.rowWidth)
  labelControl.SetWidth(this.rowWidth)

  const customFont = string.format(
    "$(%s)|$(KB_%s)|%s",
    FONT_STYLE,
    listBoxSettings.fontSize,
    FONT_WEIGHT
  )
  labelControl.SetFont(customFont)

  const selectedMultiData = getShallowClonedTable(this.list.selectedMultiData)
  if (
    selectedMultiData !== undefined &&
    selectedMultiData.get(asTableKey(rowData.key)) !== undefined
  ) {
    this.SelectControl(rowControl, false)
  }

  if (setupNow) return
  ZO_SortFilterList.SetupRow(this, rowControl, rowData)
}

ShifterBoxListProto.SetCustomDimensions = function (
  this: ShifterBoxList,
  width: number,
  height: number,
  headerHeight: number
): undefined {
  this.rowWidth = width - SCROLLBAR_WIDTH
  this.list.SetDimensions(width, height)
  this.headersContainer.SetDimensions(width, headerHeight)
  const headerValueControl = asControl(this.headersContainer.GetNamedChild("Value"))
  headerValueControl.SetWidth(width)
  const headerValueNameControl = asLabelControl(headerValueControl.GetNamedChild("Name"))
  const headerArrowControl = asControl(this.headersContainer.GetNamedChild("Arrow"))
  const headerTextWidth = headerValueNameControl.GetTextWidth()
  headerArrowControl.ClearAnchors()
  if (headerTextWidth > width) {
    headerArrowControl.SetAnchor(LEFT, headerValueNameControl, LEFT, width, 0)
  } else {
    headerArrowControl.SetAnchor(LEFT, headerValueNameControl, LEFT, headerTextWidth, 0)
  }
}

ShifterBoxListProto.Refresh = function (this: ShifterBoxList): undefined {
  const rowControls = this.list.contents
  for (let childIndex = 1; childIndex <= rowControls.GetNumChildren(); childIndex++) {
    const rowControl = asControl(rowControls.GetChild(childIndex))
    const rowControlLabel = asControl(rowControl.GetNamedChild("Label"))
    rowControlLabel.SetWidth(rowControl.GetWidth())
  }
  this.CommitScrollList()
}

ShifterBoxListProto.SetEntriesEnabled = function (
  this: ShifterBoxList,
  enabled: boolean
): undefined {
  if (!enabled) {
    this.UnselectEntries()
  }
  const list = this.list
  const rowControls = list.contents
  for (let childIndex = 1; childIndex <= rowControls.GetNumChildren(); childIndex++) {
    const rowControl = asControl(rowControls.GetChild(childIndex))
    rowControl.SetMouseEnabled(enabled)
  }
  rowControls.SetAlpha(enabled ? 1 : 0.3)
  const scrollData = asScrollDataList(ZO_ScrollList_GetDataList(this.list))
  const numChildren = scrollData.length
  if (enabled && numChildren > 0) {
    this.buttonAllControl.SetState(BSTATE_NORMAL, false)
  } else {
    this.buttonAllControl.SetState(BSTATE_DISABLED, true)
  }
  const sortHeaderGroup = this.sortHeaderGroup
  sortHeaderGroup.SetEnabled(enabled)
  const arrowCtrl = asControl(sortHeaderGroup.headerContainer.GetNamedChild("Arrow"))
  const valueCtrl = asControl(sortHeaderGroup.headerContainer.GetNamedChild("Value"))
  if (enabled) {
    arrowCtrl.SetAlpha(1)
  } else {
    arrowCtrl.SetAlpha(0.5)
  }

  list.scrollbar.SetMouseEnabled(enabled)
  list.downButton.SetMouseEnabled(enabled)
  list.upButton.SetMouseEnabled(enabled)

  this.searchHeaderUI.SetMouseEnabled(enabled)
  this.searchHeaderUIEditBox.SetMouseEnabled(enabled)
  this.buttonSearchControl.SetMouseEnabled(enabled)
  if (!enabled) {
    arrowCtrl.SetHidden(false)
    valueCtrl.SetHidden(false)
    this.searchHeaderUI.SetHidden(true)
    this.searchHeaderUIEditBox.SetText("")
    this.searchText = undefined
    const onMouseExit = this.buttonSearchControl.GetHandler("OnMouseExit")
    if (onMouseExit !== undefined) onMouseExit(this.buttonSearchControl)
    this.isSearchHeaderUIShown = false
  }

  this.enabled = enabled
}
