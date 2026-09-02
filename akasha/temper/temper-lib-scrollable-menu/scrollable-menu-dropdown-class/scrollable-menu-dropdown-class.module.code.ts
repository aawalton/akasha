import {
  asComboBoxBase,
  asControl,
  asDropdownClass,
  asDropdownClassPrivate,
  asDropdownRowControl,
  asDropdownScrollControl,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastGetHighlightTemplateThisUnknownControlUnknownU,
  asLsmCastGetMenuPrefixThisUnknownString,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastMComboBoxComboBoxBase,
  asLsmCastMParentMenuDropdownObject,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastNarrateThisUnknownAUnknownUndefined,
  asLsmCastRecordStringUnknown,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastSetupEntryThisUnknownAUnknownUnknown,
  asLsmCastThisVoidArgsUnknownUndefined,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownAltUnknownString,
  asLsmCastThisVoidListControlTypeIdNumberTemplateStringH,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import { asNumber } from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

type LsmCastLocalTypeofGetDefaultXMLTemplates = typeof getDefaultXMLTemplates
function asLsmCastLocalTypeofGetDefaultXMLTemplates(
  value: unknown
): LsmCastLocalTypeofGetDefaultXMLTemplates {
  return value as LsmCastLocalTypeofGetDefaultXMLTemplates
}

type LsmCastLocalNonNullableTypeofGetDefaultXMLTemplates = NonNullable<
  typeof getDefaultXMLTemplates
>
function asLsmCastLocalNonNullableTypeofGetDefaultXMLTemplates(
  value: unknown
): LsmCastLocalNonNullableTypeofGetDefaultXMLTemplates {
  return value as LsmCastLocalNonNullableTypeofGetDefaultXMLTemplates
}

import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const debugPrefix = libDebug.prefix
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring
const sfor = string.format

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const entryTypeDefaultsConstants = asLsmCastRecordStringUnknown(entryTypeConstants.defaults)

const getControlName = asLsmCastThisVoidControlUnknownAltUnknownString(lib.Util.getControlName)
const classes = asLsmCastRecordStringUnknown(lib.classes)
const dropdownClassPrivate = asDropdownClassPrivate(classes.dropdownClassPrivate)

const dropdownClass = asDropdownClass(ZO_ComboBoxDropdown_Keyboard.Subclass())
classes.dropdownClass = dropdownClass

const DEFAULT_ENTRY_ID = 1
const DEFAULT_LAST_ENTRY_ID = 2

dropdownClass.Initialize = function (
  this: DropdownObject,
  comboBoxObject: DropdownComboBox,
  comboBoxContainer: Control,
  depth: number
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      55,
      tos(getControlName(comboBoxObject)),
      tos(getControlName(comboBoxContainer)),
      tos(depth)
    )
  }
  const dropdownControl = asDropdownRowControl(
    CreateControlFromVirtual(
      asControl(comboBoxContainer).GetName(),
      GuiRoot,
      "LibScrollableMenu_Dropdown_Template",
      depth
    )
  )

  this.control = dropdownControl
  this.scrollControl = asDropdownScrollControl(asControl(dropdownControl).GetNamedChild("Scroll"))
  this.spacing = 0
  this.nextScrollTypeId = DEFAULT_LAST_ENTRY_ID + 1
  this.owner = undefined
  this.SetupScrollList()

  dropdownControl.object = this
  dropdownControl.m_dropdownObject = this
  this.m_comboBox = asLsmCastMComboBoxComboBoxBase(comboBoxContainer).m_comboBox
  this.m_container = comboBoxContainer
  this.owner = asComboBoxBase(comboBoxObject)
  asControl(this).SetHidden(true)

  this.m_parentMenu = asLsmCastMParentMenuDropdownObject(comboBoxObject).m_parentMenu
  this.m_sortedItems = []

  const scrollCtrl = this.scrollControl
  if (scrollCtrl) {
    scrollCtrl.scrollbar.owner = scrollCtrl
    scrollCtrl.upButton.owner = scrollCtrl
    scrollCtrl.downButton.owner = scrollCtrl
  }
  this.scroll = asDropdownScrollControl(this.scrollControl).contents

  const selfVar = this

  asDropdownScrollControl(scrollCtrl).highlightTemplateOrFunction = function (
    this: void,
    control: DropdownRowControl
  ): LuaMultiReturn<[unknown, unknown]> {
    if (selfVar.owner) {
      const xmlVirtualHighlightTemplateOfRow =
        asLsmCastGetHighlightTemplateThisUnknownControlUnknownU(selfVar.owner).GetHighlightTemplate(
          control
        )
      dropdownClassPrivate.LSM_CheckIfAnimationControlNeedsXMLTemplateChange(
        control,
        xmlVirtualHighlightTemplateOfRow
      )

      return $multi(
        xmlVirtualHighlightTemplateOfRow,
        entryTypeDefaultsConstants.defaultHighLightAnimationFieldName
      )
    }
    return $multi(
      entryTypeDefaultsConstants.defaultHighlightTemplate,
      entryTypeDefaultsConstants.defaultHighLightAnimationFieldName
    )
  }

  asDropdownScrollControl(scrollCtrl).highlightCallback = function (
    this: void,
    control: DropdownRowControl | undefined,
    isHighlighting: boolean
  ): undefined {
    if (control !== undefined && isHighlighting === true) {
      if (selfVar.owner) {
        const animationFieldName = control.highlightAnimationFieldName
        if (animationFieldName !== undefined) {
          control.LSM_rowHighlightData = {
            highlightControlName: asControl(control).GetName() + "Scroll" + animationFieldName,
            animationFieldName: animationFieldName,
            highlightXMLTemplate: asLsmCastGetHighlightTemplateThisUnknownControlUnknownU(
              selfVar.owner
            ).GetHighlightTemplate(control),
          }
        }
      } else {
        control.LSM_rowHighlightData = undefined
      }
    }
  }
}

dropdownClass.AddItems = function (this: DropdownObject, _items: unknown): undefined {
  error(debugPrefix + "scrollHelper:AddItems is obsolete. You must use m_comboBox:AddItems")
}

dropdownClass.AddItem = function (this: DropdownObject, _item: unknown): undefined {
  error(debugPrefix + "scrollHelper:AddItem is obsolete. You must use m_comboBox:AddItem")
}

dropdownClass.Narrate = function (
  this: DropdownObject,
  eventName: string,
  ctrl: unknown,
  data?: unknown,
  hasSubmenu?: unknown,
  anchorPoint?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      56,
      tos(eventName),
      tos(getControlName(ctrl)),
      tos(hasSubmenu),
      tos(anchorPoint)
    )
  }
  asLsmCastNarrateThisUnknownAUnknownUndefined(this.owner).Narrate(
    this.owner,
    eventName,
    ctrl,
    data,
    hasSubmenu,
    anchorPoint
  )
}

dropdownClass.GetFormattedNarrateEvent = function (this: DropdownObject, suffix: string): string {
  let formattedNarrateEvent = ""
  if (this.owner) {
    formattedNarrateEvent = sfor(
      "On%s%s",
      asLsmCastGetMenuPrefixThisUnknownString(this.owner).GetMenuPrefix(),
      suffix
    )
  }
  return formattedNarrateEvent
}

let getDefaultXMLTemplates:
  | ((
      this: void,
      comboBoxObject: unknown
    ) =>
      | Record<
          number,
          {
            template: string
            rowHeight: number
            setupFunc: (this: void, ...a: unknown[]) => unknown
          }
        >
      | undefined)
  | undefined
dropdownClass.SetupScrollList = function (this: DropdownObject): undefined {
  const selfVar = this
  const entryHeightWithSpacing = ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT + asNumber(this.spacing)

  let xmlTemplate = "LibScrollableMenu_ComboBoxEntry"
  let rowHeight = entryHeightWithSpacing
  let setupScrollableEntry = function (this: void, ...args: unknown[]): unknown {
    return asLsmCastSetupEntryThisUnknownAUnknownUnknown(selfVar).SetupEntry(...args)
  }

  getDefaultXMLTemplates =
    getDefaultXMLTemplates ??
    asLsmCastLocalTypeofGetDefaultXMLTemplates(lib.Util.getDefaultXMLTemplates)

  const comboBoxObject = selfVar.owner || selfVar.m_comboBox
  if (comboBoxObject) {
    const defaultTemplates =
      asLsmCastLocalNonNullableTypeofGetDefaultXMLTemplates(getDefaultXMLTemplates)(comboBoxObject)
    if (defaultTemplates !== undefined) {
      const normalEntryData = defaultTemplates[asNumber(entryTypeConstants.LSM_ENTRY_TYPE_NORMAL)]
      if (normalEntryData) {
        xmlTemplate = normalEntryData.template
        rowHeight = normalEntryData.rowHeight
        setupScrollableEntry = function (this: void, ...args: unknown[]): unknown {
          return normalEntryData.setupFunc(...args)
        }
      }
    }
  }
  void xmlTemplate

  const scrollCtrl = this.scrollControl
  ZO_ScrollList_AddDataType(
    asControl(scrollCtrl),
    DEFAULT_ENTRY_ID,
    "LibScrollableMenu_ComboBoxEntry",
    rowHeight,
    setupScrollableEntry
  )
  ZO_ScrollList_AddDataType(
    asControl(scrollCtrl),
    DEFAULT_LAST_ENTRY_ID,
    "LibScrollableMenu_ComboBoxEntry",
    ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
    setupScrollableEntry
  )

  ZO_ScrollList_EnableHighlight(asControl(scrollCtrl), "ZO_TallListHighlight")
}

dropdownClass.AddCustomEntryTemplate = function (
  this: DropdownObject,
  entryTemplate: string,
  entryHeight: number,
  setupFunction: unknown,
  widthPadding?: number
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      57,
      tos(entryTemplate),
      tos(entryHeight),
      tos(setupFunction),
      tos(widthPadding)
    )
  }

  if (!this.customEntryTemplateInfos) {
    this.customEntryTemplateInfos = {}
  }

  if (this.customEntryTemplateInfos[entryTemplate] !== undefined) {
    return
  }

  const nextScrollTypeId = asNumber(this.nextScrollTypeId)
  const customEntryInfo = {
    typeId: nextScrollTypeId,
    entryHeight: entryHeight,
    widthPadding: widthPadding,
  }

  this.customEntryTemplateInfos[entryTemplate] = customEntryInfo

  const selfVar = this
  const entryHeightWithSpacing = entryHeight + asNumber(this.spacing)
  const addDataType =
    asLsmCastThisVoidListControlTypeIdNumberTemplateStringH(ZO_ScrollList_AddDataType)
  addDataType(
    asControl(this.scrollControl),
    nextScrollTypeId,
    entryTemplate,
    entryHeightWithSpacing,
    setupFunction,
    function (this: void, ...args: unknown[]): undefined {
      dropdownClassPrivate.poolControlReset(selfVar, ...args)
    }
  )
  addDataType(
    asControl(this.scrollControl),
    nextScrollTypeId + 1,
    entryTemplate,
    entryHeight,
    setupFunction,
    function (this: void, ...args: unknown[]): undefined {
      dropdownClassPrivate.poolControlReset(selfVar, ...args)
    }
  )

  this.nextScrollTypeId = nextScrollTypeId + 2
}
