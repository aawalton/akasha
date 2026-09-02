import {
  asListEntry,
  asOrderListBox,
  asOrderRowControl,
  asOrderScrollList,
} from "../order-list-box-casts/order-list-box-casts.module.code.ts"
import {
  LAM_SORT_LIST_BOX_SCROLL_LIST_DATATYPE,
  SORT_LIST_ROW_DEFAULT_FONT,
  SORT_LIST_ROW_DEFAULT_HEIGHT,
  SORT_LIST_ROW_DEFAULT_MAXLINES,
  SORT_LIST_ROW_SELECTION_TEMPLATE_NAME,
  SORT_LIST_ROW_TEMPLATE_NAME,
} from "../order-list-box-constants/order-list-box-constants.module.code.ts"
import {
  dragOnUpdateCallback,
  onGlobalMouseDownDuringDrag,
  onGlobalMouseUpDuringDrag,
  startDragging,
  stopDragging,
  updateCursorTLC,
} from "../order-list-box-drag-methods/order-list-box-drag-methods.module.code.ts"
import {
  addNewEntry,
  addNewEntryFromDialog,
  removeSelectedEntry,
  removeValue,
  showAddNewEntryDialog,
  showAskBeforeRemoveEntryDialog,
} from "../order-list-box-entry-methods/order-list-box-entry-methods.module.code.ts"
import {
  getCurrentEntries,
  moveItem,
  onRowSelected,
  populate,
  rowSetupFunction,
  updateMoveButtonsEnabledState,
  updateScrollList,
} from "../order-list-box-list-methods/order-list-box-list-methods.module.code.ts"
import { createMoveButtons } from "../order-list-box-move-buttons/order-list-box-move-buttons.module.code.ts"
import {
  getDisabledInfoFromListBoxData,
  getRowInfoFromOrderListBoxData,
  getShowPositionInfoFromListBoxData,
  getShowValueInfoFromListBoxData,
  updateButtonsEnabledState,
} from "../order-list-box-row-setup/order-list-box-row-setup.module.code.ts"
import { wm } from "../order-list-box-state/order-list-box-state.module.code.ts"

export function createOrderListBox(
  this: void,
  panel: LamControl,
  control: LamControl,
  orderListBoxData: OrderListBoxData
): OrderListBox {
  const orderListBox: OrderListBox = asOrderListBox({
    panel,
    control,
    name: control.orderListBoxName,
    orderListBoxData,
    disabled: false,
    areButtonsDisabled: false,
    isDragDisabled: false,
    showPosition: false,
    showValue: false,
    showValueAtTooltip: false,
    rowHeight: SORT_LIST_ROW_DEFAULT_HEIGHT,
    rowTemplate: SORT_LIST_ROW_TEMPLATE_NAME,
    rowFont: SORT_LIST_ROW_DEFAULT_FONT,
    rowMaxLineCount: SORT_LIST_ROW_DEFAULT_MAXLINES,
    rowSelectionTemplate: SORT_LIST_ROW_SELECTION_TEMPLATE_NAME,
    rowSelectedCallback: undefined,
    rowHideCallback: undefined,
    dataTypeSelectSound: undefined,
    dataTypeResetControlCallback: undefined,
    Populate: populate,
    UpdateScrollList: updateScrollList,
    RowSetupFunction: rowSetupFunction,
    OnRowSelected: onRowSelected,
    MoveItem: moveItem,
    UpdateMoveButtonsEnabledState: updateMoveButtonsEnabledState,
    OnGlobalMouseDownDuringDrag: onGlobalMouseDownDuringDrag,
    OnGlobalMouseUpDuringDrag: onGlobalMouseUpDuringDrag,
    UpdateCursorTLC: updateCursorTLC,
    DragOnUpdateCallback: dragOnUpdateCallback,
    StartDragging: startDragging,
    StopDragging: stopDragging,
    GetCurrentEntries: getCurrentEntries,
    RemoveValue: removeValue,
    RemoveSelectedEntry: removeSelectedEntry,
    AddNewEntry: addNewEntry,
    AddNewEntryFromDialog: addNewEntryFromDialog,
    ShowAddNewEntryDialog: showAddNewEntryDialog,
    ShowAskBeforeRemoveEntryDialog: showAskBeforeRemoveEntryDialog,
  })

  const controlContainer = control.container
  const controlName = control.GetName()

  const scrollListControl = asOrderScrollList(
    wm.CreateControlFromVirtual(controlName + "_OrderListBox", control, "ZO_ScrollList")
  )
  const controlHeight = control.GetHeight()
  const widthXMinus = orderListBoxData.width === "half" ? 16 : 12
  const width = controlContainer.GetWidth() - widthXMinus
  scrollListControl.SetDimensions(width, controlHeight)
  scrollListControl.SetAnchor(TOPLEFT, controlContainer, TOPLEFT)
  scrollListControl.SetAnchor(BOTTOMRIGHT, control, BOTTOMRIGHT, widthXMinus * -1, 0)
  scrollListControl.SetHidden(false)
  orderListBox.scrollListControl = scrollListControl

  const [
    buttonMoveUpControl,
    buttonMoveDownControl,
    buttonMoveTotalUpControl,
    buttonMoveTotalDownControl,
  ] = createMoveButtons(orderListBox, scrollListControl, controlName)
  orderListBox.moveUpButton = buttonMoveUpControl
  orderListBox.moveDownButton = buttonMoveDownControl
  orderListBox.moveTotalUpButton = buttonMoveTotalUpControl
  orderListBox.moveTotalDownButton = buttonMoveTotalDownControl

  const [dragDisabled, buttonsDisabled] = getDisabledInfoFromListBoxData(orderListBoxData)
  orderListBox.isDragDisabled = dragDisabled
  orderListBox.areButtonsDisabled = buttonsDisabled
  updateButtonsEnabledState(
    control,
    orderListBox.areButtonsDisabled,
    orderListBoxData,
    buttonMoveUpControl,
    buttonMoveDownControl,
    buttonMoveTotalUpControl,
    buttonMoveTotalDownControl
  )

  orderListBox.showPosition = getShowPositionInfoFromListBoxData(orderListBoxData)

  const dataTypeId = LAM_SORT_LIST_BOX_SCROLL_LIST_DATATYPE

  const [
    rowHeight,
    rowTemplate,
    rowFont,
    rowMaxLineCount,
    rowSelectionTemplate,
    rowSelectedCallback,
    rowHideCallback,
    dataTypeSelectSound,
    dataTypeResetControlCallback,
  ] = getRowInfoFromOrderListBoxData(orderListBoxData)
  orderListBox.rowHeight = rowHeight
  orderListBox.rowTemplate = rowTemplate
  orderListBox.rowFont = rowFont
  orderListBox.rowMaxLineCount = rowMaxLineCount
  orderListBox.rowSelectionTemplate = rowSelectionTemplate
  orderListBox.rowSelectedCallback = rowSelectedCallback
  orderListBox.rowHideCallback = rowHideCallback
  orderListBox.dataTypeSelectSound = dataTypeSelectSound
  orderListBox.dataTypeResetControlCallback = dataTypeResetControlCallback

  const templateName = orderListBox.rowTemplate
  const selectTemplate = orderListBox.rowSelectionTemplate
  const rowHeightLocal = orderListBox.rowHeight
  const dataTypeSelectSoundLocal = orderListBox.dataTypeSelectSound
  const rowHideCallbackLocal = orderListBox.rowHideCallback
  const resetControlCallback = orderListBox.dataTypeResetControlCallback

  const [showValue, showValueAtTooltip] = getShowValueInfoFromListBoxData(orderListBoxData)
  orderListBox.showValue = showValue
  orderListBox.showValueAtTooltip = showValueAtTooltip

  const setupFunction = (...args: unknown[]): undefined => {
    orderListBox.RowSetupFunction(
      asOrderRowControl(args[0]),
      asListEntry(args[1]),
      asOrderScrollList(args[2])
    )
  }
  const selectCallback = (...args: unknown[]): undefined => {
    const previouslySelectedData = args[0]
    const selectedData = args[1]
    const reselectingDuringRebuild = args[2] === true
    if (orderListBox.disabled) {
      return
    }
    orderListBox.OnRowSelected(
      previouslySelectedData,
      selectedData,
      reselectingDuringRebuild,
      buttonMoveUpControl,
      buttonMoveDownControl,
      buttonMoveTotalUpControl,
      buttonMoveTotalDownControl
    )
    if (
      orderListBox.rowSelectedCallback !== undefined &&
      typeof orderListBox.rowSelectedCallback === "function"
    ) {
      orderListBox.rowSelectedCallback(
        orderListBox,
        previouslySelectedData,
        selectedData,
        reselectingDuringRebuild
      )
    }
  }

  ZO_ScrollList_AddDataType(
    scrollListControl,
    dataTypeId,
    templateName,
    rowHeightLocal,
    setupFunction,
    rowHideCallbackLocal,
    dataTypeSelectSoundLocal,
    resetControlCallback
  )
  ZO_ScrollList_EnableSelection(scrollListControl, selectTemplate, selectCallback)

  return orderListBox
}
