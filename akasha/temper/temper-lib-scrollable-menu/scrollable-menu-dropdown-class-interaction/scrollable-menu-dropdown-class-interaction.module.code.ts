import {
  asContextMenuObject,
  asControl,
  asDropdownClass,
  asDropdownClassPrivate,
  asDropdownObject,
  asDropdownScrollControl,
  asLsmCastAnchorRightBoolean,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastGetContainerThisUnknownControl,
  asLsmCastGetSubMenuOpeningSideThisUnknownUnknown,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastHideOnMouseExitThisUnknownMocUnknownUndefined,
  asLsmCastIsItemSelectedThisUnknownItemUnknownBoolean,
  asLsmCastIsItemSelectedUnknown,
  asLsmCastIsMouseOverControlThisUnknownBoolean,
  asLsmCastMDropdownObjectDropdownObject,
  asLsmCastMIndexNumber,
  asLsmCastMSubmenuDropdownObject,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastRecordNumberUnknown,
  asLsmCastRecordStringUnknown,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastSetSelectedThisUnknownIndexUnknownUndefined,
  asLsmCastThisVoidArgsUnknownUndefined,
  asLsmCastThisVoidContextMenuObject,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownAltUnknownString,
  asLsmCastThisVoidControlUnknownRecordStringUnknown,
  asLsmCastThisVoidControlUnknownUndefined,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidSelfUnknownControlUnknownUndefined,
  asNumber,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"
import {
  getContextMenu,
  lib,
  setContextMenu,
} from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring

const zo_comboBoxDropdown_onMouseExitEntry = asLsmCastThisVoidSelfUnknownControlUnknownUndefined(
  asLsmCastRecordStringUnknown(ZO_ComboBoxDropdown_Keyboard).OnMouseExitEntry
)
const zo_comboBoxDropdown_onMouseEnterEntry = asLsmCastThisVoidSelfUnknownControlUnknownUndefined(
  asLsmCastRecordStringUnknown(ZO_ComboBoxDropdown_Keyboard).OnMouseEnterEntry
)

const getControlName = asLsmCastThisVoidControlUnknownAltUnknownString(lib.Util.getControlName)
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(lib.Util.getControlData)
const getContextMenuReference = asLsmCastThisVoidContextMenuObject(lib.Util.getContextMenuReference)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const dropdownClassPrivate = asDropdownClassPrivate(classes.dropdownClassPrivate)
const dropdownClass = asDropdownClass(classes.dropdownClass)

dropdownClass.GetSubMenuOpeningSide = function (this: DropdownObject): unknown {
  if (this.m_comboBox) {
    return asLsmCastGetSubMenuOpeningSideThisUnknownUnknown(this.m_comboBox).GetSubMenuOpeningSide()
  }
}

dropdownClass.AnchorToControl = function (
  this: DropdownObject,
  parentControl: DropdownRowControl
): undefined {
  const [guiRootWidth] = GuiRoot.GetDimensions()
  let right: boolean | undefined = true
  let openSubmenuToSideForced = false

  const anchorScrollbar = asDropdownScrollControl(
    asDropdownObject(parentControl.m_dropdownObject).scrollControl
  ).scrollbar
  let offsetX = anchorScrollbar.IsHidden()
    ? ZO_SCROLLABLE_COMBO_BOX_LIST_PADDING_Y
    : ZO_SCROLL_BAR_WIDTH

  const offsetY = -ZO_SCROLLABLE_COMBO_BOX_LIST_PADDING_Y

  let point = TOPLEFT
  let relativePoint = TOPRIGHT

  if (this.m_parentMenu !== undefined) {
    ;[openSubmenuToSideForced, right] = dropdownClassPrivate.checkWhereToShowSubmenu(this)

    const parentDropdownObject = asDropdownObject(this.m_parentMenu.m_dropdownObject)
    if (
      right === undefined &&
      asLsmCastAnchorRightBoolean(parentDropdownObject).anchorRight !== undefined
    ) {
      right = asLsmCastAnchorRightBoolean(parentDropdownObject).anchorRight
    }
  }

  if (
    !right ||
    (!openSubmenuToSideForced &&
      parentControl.GetRight() + asControl(this.control).GetWidth() > guiRootWidth)
  ) {
    right = false
    offsetX = 0
    point = TOPRIGHT
    relativePoint = TOPLEFT
  }

  const relativeTo = parentControl
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      58,
      tos(point),
      tos(getControlName(relativeTo)),
      tos(relativePoint),
      tos(offsetX),
      tos(offsetY)
    )
  }

  asControl(this.control).ClearAnchors()
  asControl(this.control).SetAnchor(point, asControl(relativeTo), relativePoint, offsetX, offsetY)

  this.anchorRight = right
}

dropdownClass.AnchorToComboBox = function (this: DropdownObject, comboBox: unknown): undefined {
  const parentControl = asLsmCastGetContainerThisUnknownControl(comboBox).GetContainer()
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 59, tos(getControlName(parentControl)))
  }
  asControl(this.control).ClearAnchors()
  asControl(this.control).SetAnchor(TOPLEFT, parentControl, BOTTOMLEFT)
}

dropdownClass.AnchorToMouse = function (this: DropdownObject): undefined {
  const menuToAnchor = asControl(this.control)

  let [x] = GetUIMousePosition()
  const [guiRootWidth, guiRootHeight] = GuiRoot.GetDimensions()
  const [, y] = GetUIMousePosition()

  menuToAnchor.ClearAnchors()

  const [openSubmenuToSideForced, rightRet] = dropdownClassPrivate.checkWhereToShowSubmenu(this)
  let right = rightRet
  if (!openSubmenuToSideForced) {
    if (x + menuToAnchor.GetWidth() > guiRootWidth) {
      right = false
    }
  }

  let bottom = true
  if (asNumber(y) + menuToAnchor.GetHeight() > guiRootHeight) {
    bottom = false
  }

  let point: number | undefined
  let relativeTo: Control | undefined
  let relativePoint: number | undefined
  if (right) {
    x = x + 2
    if (bottom) {
      point = TOPLEFT
      relativeTo = undefined
      relativePoint = TOPLEFT
    } else {
      point = BOTTOMLEFT
      relativeTo = undefined
      relativePoint = TOPLEFT
    }
  } else {
    x = x - 2
    if (bottom) {
      point = TOPRIGHT
      relativeTo = undefined
      relativePoint = TOPLEFT
    } else {
      point = BOTTOMRIGHT
      relativeTo = undefined
      relativePoint = TOPLEFT
    }
  }
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      60,
      tos(point),
      tos(getControlName(relativeTo)),
      tos(relativePoint),
      tos(x),
      tos(y)
    )
  }
  if (point !== undefined && relativePoint !== undefined) {
    menuToAnchor.SetAnchor(point, relativeTo, relativePoint, x, asNumber(y))
  }
}

dropdownClass.GetSubmenu = function (this: DropdownObject): DropdownObject | undefined {
  if (this.owner) {
    this.m_submenu = asLsmCastMSubmenuDropdownObject(this.owner).m_submenu
  }
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 61, tos(this.m_submenu))
  }

  return this.m_submenu
}

dropdownClass.IsDropdownVisible = function (this: DropdownObject): boolean {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 62, tos(!this.IsHidden()))
  }
  return !this.IsHidden()
}

dropdownClass.IsEnteringSubmenu = function (this: DropdownObject): boolean {
  const submenu = this.GetSubmenu()
  if (submenu) {
    if (
      submenu.IsDropdownVisible() &&
      asLsmCastIsMouseOverControlThisUnknownBoolean(submenu).IsMouseOverControl()
    ) {
      if (libDebug.doDebug) {
        dlog(libDebug.LSM_LOGTYPE_VERBOSE, 63)
      }
      return true
    }
  }
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 64)
  }
  return false
}

dropdownClass.IsItemSelected = function (this: DropdownObject, item: unknown): boolean {
  if (this.owner && asLsmCastIsItemSelectedUnknown(this.owner).IsItemSelected) {
    if (libDebug.doDebug) {
      dlog(
        libDebug.LSM_LOGTYPE_VERBOSE,
        65,
        tos(asLsmCastIsItemSelectedThisUnknownItemUnknownBoolean(this.owner).IsItemSelected(item))
      )
    }
    return asLsmCastIsItemSelectedThisUnknownItemUnknownBoolean(this.owner).IsItemSelected(item)
  }
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 66)
  }
  return false
}

dropdownClass.IsMouseOverOpeningControl = function (this: DropdownObject): boolean {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 67)
  }
  return false
}

dropdownClass.OnMouseEnterEntry = function (
  this: DropdownObject,
  control: DropdownRowControl
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 68, tos(getControlName(control)))
  }
  this.OnMouseExitTimeout(control)

  const data = getControlData(control)
  if (data.enabled === true) {
    if (
      !dropdownClassPrivate.runHandler(
        this,
        asLsmCastRecordNumberUnknown(dropdownClassPrivate.handlerFunctions.onMouseEnter),
        control,
        data
      )
    ) {
      zo_comboBoxDropdown_onMouseEnterEntry(this, control)
    }

    if (data.tooltip || data.customTooltip) {
      this.ShowTooltip(control, data)
    }
  }

  setContextMenu(getContextMenuReference())
  const gContextMenu = asContextMenuObject(getContextMenu())
  if (asDropdownObject(gContextMenu).IsDropdownVisible()) {
    asLsmCastMDropdownObjectDropdownObject(gContextMenu).m_dropdownObject.OnMouseExitTimeout(
      control
    )
  }
}

dropdownClass.OnMouseExitEntry = function (
  this: DropdownObject,
  control: DropdownRowControl
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 69, tos(getControlName(control)))
  }

  asLsmCastThisVoidControlUnknownUndefined(lib.Util.hideTooltip)(control)
  const data = getControlData(control)
  this.OnMouseExitTimeout(control)
  if (
    data.enabled &&
    !dropdownClassPrivate.runHandler(
      this,
      asLsmCastRecordNumberUnknown(dropdownClassPrivate.handlerFunctions.onMouseExit),
      control,
      data
    )
  ) {
    zo_comboBoxDropdown_onMouseExitEntry(this, control)
  }
}

dropdownClass.OnMouseExitTimeout = function (this: DropdownObject, control: unknown): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 70, tos(getControlName(control)))
  }
  const self = this
  dropdownClassPrivate.setTimeout(function (this: void): undefined {
    asLsmCastHideOnMouseExitThisUnknownMocUnknownUndefined(self.owner).HideOnMouseExit(moc())
  })
}

dropdownClass.OnEntrySelected = function (
  this: DropdownObject,
  control: DropdownRowControl
): undefined {
  if (this.owner) {
    asLsmCastSetSelectedThisUnknownIndexUnknownUndefined(this.owner).SetSelected(
      asLsmCastMIndexNumber(control.m_data).m_index
    )
  }
}
