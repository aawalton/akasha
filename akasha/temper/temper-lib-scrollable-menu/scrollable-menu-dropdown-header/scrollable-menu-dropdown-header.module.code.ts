import {
  asAnchorClass,
  asAnchorObject,
  asControl,
  asDropdownHeaderChildControl,
  asDropdownHeaderPrivate,
  asLsmCastApplyCustomSortButtonsDataThisUnknownHeaderCon,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastDropdownHeaderChildControl } from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastNumberUndefined2,
  asLsmCastRecordNumberRecordStringUnknown,
  asLsmCastRecordStringUnknown,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asNumber } from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { getValueOrCallback } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const constants = lib.constants
const dropdownConstants = asLsmCastRecordStringUnknown(constants.dropdown)
const DROPDOWN_DEFAULTS = asLsmCastRecordStringUnknown(dropdownConstants.defaults)
const MIN_WIDTH_WITHOUT_SEARCH_HEADER = asNumber(DROPDOWN_DEFAULTS.MIN_WIDTH_WITHOUT_SEARCH_HEADER)
const MIN_WIDTH_WITH_SEARCH_HEADER = asNumber(DROPDOWN_DEFAULTS.MIN_WIDTH_WITH_SEARCH_HEADER)

const HEADER_CONTROLS = {
  PARENT: -1,
  TITLE_BASELINE: -2,
  CENTER_BASELINE: 0,
  TITLE: 1,
  SUBTITLE: 2,
  DIVIDER_SIMPLE: 3,
  FILTER_CONTAINER: 4,
  CUSTOM_CONTROL: 5,
  TOGGLE_BUTTON: 6,
  TOGGLE_BUTTON_CLICK_EXTENSION: 7,
  TOGGLE_ICON: 8,
  TOGGLE_TITLE: 9,
  SORT_CONTAINER: 10,
}
asLsmCastRecordStringUnknown(lib.XML).headerControls = HEADER_CONTROLS

const dropdownHeaderPrivate = asDropdownHeaderPrivate({})
asLsmCastRecordStringUnknown(lib.classes).dropdownHeaderPrivate = dropdownHeaderPrivate

{
  const PARENT = HEADER_CONTROLS.PARENT
  const CENTER_BASELINE = HEADER_CONTROLS.CENTER_BASELINE
  const DIVIDER_SIMPLE = HEADER_CONTROLS.DIVIDER_SIMPLE
  const TOGGLE_BUTTON = HEADER_CONTROLS.TOGGLE_BUTTON
  const TOGGLE_BUTTON_CLICK_EXTENSION = HEADER_CONTROLS.TOGGLE_BUTTON_CLICK_EXTENSION
  const TOGGLE_ICON = HEADER_CONTROLS.TOGGLE_ICON
  const TOGGLE_TITLE = HEADER_CONTROLS.TOGGLE_TITLE
  const SORT_CONTAINER = HEADER_CONTROLS.SORT_CONTAINER

  const DEFAULT_CONTROLID = CENTER_BASELINE

  let g_currentBottomLeftHeader = DEFAULT_CONTROLID

  const ROW_OFFSET_Y = 5

  const Anchor = asAnchorClass(ZO_Object.Subclass())

  Anchor.New = function (
    this: AnchorClass,
    pointOnMe: number,
    targetId: number | undefined,
    pointOnTarget: number,
    offsetX: number,
    offsetY: number
  ): AnchorObject {
    const object = asAnchorObject(ZO_Object.New(this))
    object.targetId = targetId
    object.anchor = ZO_Anchor.New(pointOnMe, undefined, pointOnTarget, offsetX, offsetY)
    return object
  }

  const DEFAULT_ANCHOR = 100

  const controlsAtCollapsedHeaderUsingSpecialAnchors = new LuaTable<number, boolean>()
  controlsAtCollapsedHeaderUsingSpecialAnchors.set(TOGGLE_ICON, true)
  controlsAtCollapsedHeaderUsingSpecialAnchors.set(TOGGLE_TITLE, true)

  const allowedIconAlignments = new LuaTable<number, boolean>()
  allowedIconAlignments.set(LEFT, true)
  allowedIconAlignments.set(CENTER, true)
  allowedIconAlignments.set(RIGHT, true)

  const toggleHeaderCollapsedAnchors = new LuaTable<number, AnchorObject[]>()
  toggleHeaderCollapsedAnchors.set(LEFT, [Anchor.New(LEFT, PARENT, LEFT, 10, 0)])
  toggleHeaderCollapsedAnchors.set(CENTER, [Anchor.New(CENTER, PARENT, CENTER, 0, 0)])
  toggleHeaderCollapsedAnchors.set(RIGHT, [Anchor.New(RIGHT, PARENT, RIGHT, -10, 0)])

  const anchors = new LuaTable<number, AnchorObject[]>()
  anchors.set(DEFAULT_ANCHOR, [
    Anchor.New(TOPLEFT, undefined, BOTTOMLEFT, 0, 0),
    Anchor.New(TOPRIGHT, undefined, BOTTOMRIGHT, 0, 0),
  ])
  anchors.set(TOGGLE_BUTTON, [Anchor.New(BOTTOMRIGHT, PARENT, BOTTOMRIGHT, -ROW_OFFSET_Y, 0)])
  anchors.set(TOGGLE_BUTTON_CLICK_EXTENSION, [
    Anchor.New(TOPLEFT, PARENT, TOPLEFT, 2, 2),
    Anchor.New(BOTTOMRIGHT, PARENT, BOTTOMRIGHT, -2, -2),
  ])
  anchors.set(DIVIDER_SIMPLE, [
    Anchor.New(TOPLEFT, undefined, BOTTOMLEFT, 0, ROW_OFFSET_Y),
    Anchor.New(TOPRIGHT, undefined, BOTTOMRIGHT, 0, 0),
  ])
  anchors.set(TOGGLE_ICON, toggleHeaderCollapsedAnchors.get(CENTER))
  anchors.set(TOGGLE_TITLE, toggleHeaderCollapsedAnchors.get(CENTER))
  anchors.set(SORT_CONTAINER, [Anchor.New(TOPLEFT, PARENT, TOPLEFT, 0, 0)])

  function getHeaderCollapsedAnchor(
    this: void,
    align: number,
    offsetX: number | undefined,
    offsetY: number | undefined
  ): AnchorObject[] {
    if ((offsetX === undefined || offsetX === 0) && (offsetY === undefined || offsetY === 0)) {
      return toggleHeaderCollapsedAnchors.get(align)
    }
    return [Anchor.New(align, PARENT, align, asNumber(offsetX), asNumber(offsetY))]
  }

  function headerApplyAnchorToControl(
    this: void,
    headerControl: DropdownHeaderControl,
    anchorData: AnchorObject,
    _controlId: number,
    control: DropdownHeaderChildControl
  ): undefined {
    if (asControl(headerControl).IsHidden()) {
      asControl(headerControl).SetHidden(false)
    }
    const controls = headerControl.controls

    const targetId = anchorData.targetId ?? g_currentBottomLeftHeader
    const target = controls[targetId]

    anchorData.anchor.SetTarget(asControl(target))
    anchorData.anchor.AddToControl(asControl(control))
  }

  function headerApplyAnchorSetToControl(
    this: void,
    comboBox: unknown,
    headerControl: DropdownHeaderControl,
    anchorSet: AnchorObject[],
    controlId: number,
    collapsed: boolean | undefined,
    isSortEnabled: boolean | undefined
  ): number {
    const controls = headerControl.controls
    const control = asDropdownHeaderChildControl(controls[controlId])
    control.SetHidden(false)

    headerApplyAnchorToControl(headerControl, asAnchorObject(anchorSet[1 - 1]), controlId, control)
    if (anchorSet[2 - 1]) {
      headerApplyAnchorToControl(
        headerControl,
        asAnchorObject(anchorSet[2 - 1]),
        controlId,
        control
      )
    }

    if (controlId !== SORT_CONTAINER) {
      g_currentBottomLeftHeader = controlId
    }

    let height = control.GetHeight()

    if (controlId === TOGGLE_BUTTON) {
      height = collapsed ? height : 0
    } else if (controlId === SORT_CONTAINER) {
      height = 0
      if (collapsed) {
        control.SetHidden(true)
        control.ClearAnchors()
        control.SetDimensions(0, 0)
      } else {
        const customSortButtonDataApplied =
          (isSortEnabled === true &&
            asLsmCastApplyCustomSortButtonsDataThisUnknownHeaderCon(
              comboBox
            ).ApplyCustomSortButtonsData(headerControl, control)) ||
          false
        if (!customSortButtonDataApplied) {
          control.SetDimensions(18, "100%")
        }
        control.SetHidden(false)
      }
    } else if (controlId === TOGGLE_BUTTON_CLICK_EXTENSION) {
      height = 0
      if (collapsed) {
        control.SetHidden(false)
        control.SetHeight(asDropdownHeaderChildControl(controls[TOGGLE_BUTTON]).GetHeight())
      } else {
        control.SetHidden(true)
        control.ClearAnchors()
        control.SetDimensions(0, 0)
      }
    } else if (controlsAtCollapsedHeaderUsingSpecialAnchors.get(controlId)) {
      height = collapsed ? height : 0
    }
    return height
  }

  function showHeaderDivider(this: void, controlId: number): boolean {
    if (g_currentBottomLeftHeader !== DEFAULT_CONTROLID && controlId < TOGGLE_BUTTON) {
      return g_currentBottomLeftHeader < DIVIDER_SIMPLE && controlId > DIVIDER_SIMPLE
    }
    return false
  }

  function headerUpdateAnchors(
    this: void,
    comboBox: unknown,
    headerControl: DropdownHeaderControl,
    refreshResults: Record<number, unknown>,
    collapsed: boolean | undefined,
    isFilterEnabled: unknown,
    showToggleHeaderControls: boolean,
    toggleHeaderControlData: Record<number, Record<string, unknown>> | undefined,
    isSortEnabled: boolean | undefined
  ): undefined {
    let headerHeight = 0
    const controls = headerControl.controls
    g_currentBottomLeftHeader = DEFAULT_CONTROLID

    for (const [controlId, control] of ipairs(asLsmCastDropdownHeaderChildControl(controls))) {
      control.ClearAnchors()
      control.SetHidden(true)

      let hidden = !refreshResults[controlId]
      if (
        !collapsed &&
        (controlId === TOGGLE_BUTTON ||
          controlId === TOGGLE_BUTTON_CLICK_EXTENSION ||
          controlsAtCollapsedHeaderUsingSpecialAnchors.get(controlId)) &&
        g_currentBottomLeftHeader === DEFAULT_CONTROLID
      ) {
        hidden = true
      }
      if (!hidden) {
        if (showHeaderDivider(controlId)) {
          headerHeight =
            headerHeight +
            headerApplyAnchorSetToControl(
              comboBox,
              headerControl,
              anchors.get(DIVIDER_SIMPLE),
              DIVIDER_SIMPLE,
              undefined,
              undefined
            )
        }

        let anchorSet = anchors.get(controlId) || anchors.get(DEFAULT_ANCHOR)
        if (
          collapsed === true &&
          showToggleHeaderControls === true &&
          controlsAtCollapsedHeaderUsingSpecialAnchors.get(controlId) &&
          asLsmCastRecordNumberRecordStringUnknown(toggleHeaderControlData)[controlId] !== undefined
        ) {
          const controlToggleHeaderData = asLsmCastRecordStringUnknown(
            asLsmCastRecordNumberRecordStringUnknown(toggleHeaderControlData)[controlId]
          )
          const anchorAlign =
            asLsmCastNumberUndefined2(
              getValueOrCallback(controlToggleHeaderData.align, controlToggleHeaderData)
            ) ?? undefined
          if (anchorAlign !== undefined && allowedIconAlignments.get(anchorAlign)) {
            anchorSet = getHeaderCollapsedAnchor(
              anchorAlign,
              asLsmCastNumberUndefined2(
                getValueOrCallback(controlToggleHeaderData.offsetX, controlToggleHeaderData)
              ),
              asLsmCastNumberUndefined2(
                getValueOrCallback(controlToggleHeaderData.offsetY, controlToggleHeaderData)
              )
            )
          }
        }
        headerHeight =
          headerHeight +
          headerApplyAnchorSetToControl(
            comboBox,
            headerControl,
            anchorSet,
            controlId,
            collapsed,
            isSortEnabled
          )
      }
    }

    if (headerHeight > 0) {
      if (!collapsed) {
        headerHeight = headerHeight + ROW_OFFSET_Y * 3
      }
      headerControl.SetHeight(headerHeight)
    }

    const headerWidth = headerControl.GetWidth()
    if (isFilterEnabled && headerWidth < MIN_WIDTH_WITH_SEARCH_HEADER) {
      headerControl.SetDimensionConstraints(MIN_WIDTH_WITH_SEARCH_HEADER, headerHeight)
      headerControl.SetWidth(MIN_WIDTH_WITH_SEARCH_HEADER)
    } else if (!isFilterEnabled && headerWidth < MIN_WIDTH_WITH_SEARCH_HEADER) {
      headerControl.SetDimensionConstraints(MIN_WIDTH_WITHOUT_SEARCH_HEADER, headerHeight)
      headerControl.SetWidth(MIN_WIDTH_WITHOUT_SEARCH_HEADER)
    }
  }

  dropdownHeaderPrivate.header_updateAnchors = headerUpdateAnchors
}
