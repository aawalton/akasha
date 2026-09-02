import {
  asComboBoxBaseClass,
  asDropdownAddTemplate,
  asLsmCastBoolean,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastRecordNumberLsmTemplateData,
  asLsmCastRecordNumberObject,
  asLsmCastRecordNumberRecordStringUnknown,
  asLsmCastRecordNumberUnknown,
  asLsmCastRecordStringUnknown,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastUnknown,
  asLsmTemplateData,
  asNumber,
  asObject,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { addItemBase } from "../scrollable-menu-combobox-base-data/scrollable-menu-combobox-base-data.module.code.ts"
import { getValueOrCallback } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const classes = asLsmCastRecordStringUnknown(lib.classes)

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const ENTRY_TYPE_DEFAULTS = asLsmCastRecordStringUnknown(entryTypeConstants.defaults)
const entryTypeDefaultsHighlights = asLsmCastRecordStringUnknown(ENTRY_TYPE_DEFAULTS.highlights)
const LIBRARY_ALLOWED_ENTRY_TYPES = asLsmCastBoolean(entryTypeConstants.libraryAllowedEntryTypes)

const LSM_ENTRY_TYPE_NORMAL = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_NORMAL)
const LSM_ENTRY_TYPE_SUBMENU = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_SUBMENU)
const LSM_ENTRY_TYPE_DIVIDER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER)
const LSM_ENTRY_TYPE_HEADER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_HEADER)
const LSM_ENTRY_TYPE_CHECKBOX = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_CHECKBOX)
const LSM_ENTRY_TYPE_BUTTON = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_BUTTON)
const LSM_ENTRY_TYPE_RADIOBUTTON = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_RADIOBUTTON)
const LSM_ENTRY_TYPE_EDITBOX = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_EDITBOX)
const LSM_ENTRY_TYPE_SLIDER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_SLIDER)

const zo_comboBox_base_addItem = ZO_ComboBox_Base.AddItem

const libUtil = lib.Util

const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

comboBox_base.AddItem = function (
  this: ComboBoxBase,
  itemEntry: Record<string, unknown>,
  updateOptions?: unknown,
  templates?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      85,
      tos(updateOptions),
      tos(this.baseEntryHeight),
      tos(templates)
    )
  }
  addItemBase(this, itemEntry)
  zo_comboBox_base_addItem(this, itemEntry, updateOptions)
  const unsorted = asLsmCastUnknown(this.m_unsortedItems)
  unsorted[unsorted.length] = itemEntry
}

comboBox_base.AddCustomEntryTemplate = function (
  this: ComboBoxBase,
  entryTemplate: unknown,
  entryHeight: unknown,
  setupFunction: unknown,
  widthPadding?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      86,
      tos(entryTemplate),
      tos(entryHeight),
      tos(setupFunction),
      tos(widthPadding)
    )
  }
  if (!this.m_customEntryTemplateInfos) {
    this.m_customEntryTemplateInfos = {}
  }

  const customEntryInfo = {
    entryTemplate: entryTemplate,
    entryHeight: entryHeight,
    widthPadding: widthPadding,
    setupFunction: setupFunction,
  }

  asLsmCastRecordStringUnknown(this.m_customEntryTemplateInfos)[asString(entryTemplate)] =
    customEntryInfo

  asDropdownAddTemplate(this.m_dropdownObject).AddCustomEntryTemplate(
    entryTemplate,
    entryHeight,
    setupFunction,
    widthPadding
  )
}

comboBox_base.GetItemFontObject = function (
  this: ComboBoxBase,
  item: Record<string, unknown>
): unknown {
  const font = asString(item.font || this.GetDropdownFont())
  return asLsmCastRecordStringUnknown(_G)[font]
}

function getTemplateData(
  this: void,
  entryType: number,
  template: Record<number, LsmTemplateData>
): LuaMultiReturn<[unknown, unknown, unknown, unknown]> {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 87, tos(entryType), tos(template))
  }
  const templateDataForEntryType = asLsmTemplateData(template[entryType])
  return $multi(
    templateDataForEntryType.template,
    templateDataForEntryType.rowHeight,
    templateDataForEntryType.setupFunc,
    templateDataForEntryType.widthPadding
  )
}

function getDefaultXMLTemplates(
  this: void,
  selfVar: ComboBoxBase
): LuaMultiReturn<[Record<number, LsmTemplateData>, Record<number, Record<string, unknown>>]> {
  const defaultXMLTemplates: Record<number, LsmTemplateData> = {
    [LSM_ENTRY_TYPE_NORMAL]: {
      template: "LibScrollableMenu_ComboBoxEntry",
      rowHeight: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      setupFunc: function (
        this: void,
        control: Control,
        data: Record<string, unknown>,
        list: unknown
      ): undefined {
        selfVar.SetupEntryLabel(control, data, list, LSM_ENTRY_TYPE_NORMAL)
      },
    },
    [LSM_ENTRY_TYPE_SUBMENU]: {
      template: "LibScrollableMenu_ComboBoxSubmenuEntry",
      rowHeight: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      widthPadding: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      setupFunc: function (
        this: void,
        control: Control,
        data: Record<string, unknown>,
        list: unknown
      ): undefined {
        selfVar.SetupEntrySubmenu(control, data, list)
      },
    },
    [LSM_ENTRY_TYPE_DIVIDER]: {
      template: "LibScrollableMenu_ComboBoxDividerEntry",
      rowHeight: ENTRY_TYPE_DEFAULTS.DIVIDER_ENTRY_HEIGHT,
      setupFunc: function (
        this: void,
        control: Control,
        data: Record<string, unknown>,
        list: unknown
      ): undefined {
        selfVar.SetupEntryDivider(control, data, list)
      },
    },
    [LSM_ENTRY_TYPE_HEADER]: {
      template: "LibScrollableMenu_ComboBoxHeaderEntry",
      rowHeight: ENTRY_TYPE_DEFAULTS.HEADER_ENTRY_HEIGHT,
      setupFunc: function (
        this: void,
        control: Control,
        data: Record<string, unknown>,
        list: unknown
      ): undefined {
        selfVar.SetupEntryHeader(control, data, list)
      },
    },
    [LSM_ENTRY_TYPE_CHECKBOX]: {
      template: "LibScrollableMenu_ComboBoxCheckboxEntry",
      rowHeight: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      widthPadding: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      setupFunc: function (
        this: void,
        control: Control,
        data: Record<string, unknown>,
        list: unknown
      ): undefined {
        selfVar.SetupEntryCheckbox(control, data, list)
      },
    },
    [LSM_ENTRY_TYPE_BUTTON]: {
      template: "LibScrollableMenu_ComboBoxButtonEntry",
      rowHeight: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      widthPadding: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      setupFunc: function (
        this: void,
        control: Control,
        data: Record<string, unknown>,
        list: unknown
      ): undefined {
        selfVar.SetupEntryButton(control, data, list)
      },
    },
    [LSM_ENTRY_TYPE_RADIOBUTTON]: {
      template: "LibScrollableMenu_ComboBoxRadioButtonEntry",
      rowHeight: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      widthPadding: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      setupFunc: function (
        this: void,
        control: Control,
        data: Record<string, unknown>,
        list: unknown
      ): undefined {
        selfVar.SetupEntryRadioButton(control, data, list)
      },
    },
    [LSM_ENTRY_TYPE_EDITBOX]: {
      template: "LibScrollableMenu_ComboBoxEditBoxEntry",
      rowHeight: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      widthPadding: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      setupFunc: function (
        this: void,
        control: Control,
        data: Record<string, unknown>,
        list: unknown
      ): undefined {
        selfVar.SetupEntryEditBox(control, data, list)
      },
    },
    [LSM_ENTRY_TYPE_SLIDER]: {
      template: "LibScrollableMenu_ComboBoxSliderEntry",
      rowHeight: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      widthPadding: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      setupFunc: function (
        this: void,
        control: Control,
        data: Record<string, unknown>,
        list: unknown
      ): undefined {
        selfVar.SetupEntrySlider(control, data, list)
      },
    },
  }

  const defaultHighlightTemplate = entryTypeDefaultsHighlights.defaultHighlightTemplate
  const defaultHighlightColor = entryTypeDefaultsHighlights.defaultHighlightColor
  const greenHighlight = entryTypeDefaultsHighlights.LSM_ROW_HIGHLIGHT_GREEN
  const defaultXMLHighlightTemplates: Record<number, Record<string, unknown>> = {
    [LSM_ENTRY_TYPE_NORMAL]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [LSM_ENTRY_TYPE_SUBMENU]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      templateSubMenuWithCallback: greenHighlight,
      color: defaultHighlightColor,
    },
    [LSM_ENTRY_TYPE_DIVIDER]: {
      template: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [LSM_ENTRY_TYPE_HEADER]: {
      template: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [LSM_ENTRY_TYPE_CHECKBOX]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [LSM_ENTRY_TYPE_BUTTON]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [LSM_ENTRY_TYPE_RADIOBUTTON]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [LSM_ENTRY_TYPE_EDITBOX]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [LSM_ENTRY_TYPE_SLIDER]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
  }
  return $multi(defaultXMLTemplates, defaultXMLHighlightTemplates)
}
libUtil.getDefaultXMLTemplates = getDefaultXMLTemplates

comboBox_base.AddCustomEntryTemplates = function (
  this: ComboBoxBase,
  options: LsmComboBoxOptions | undefined,
  _isContextMenu?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 88, tos(options))
  }

  const [defaultXMLTemplates, defaultXMLHighlightTemplates] = getDefaultXMLTemplates(this)

  const optionTemplates =
    options && getValueOrCallback(asLsmCastRecordStringUnknown(options).XMLRowTemplates, options)
  const xmLrowTemplatesToUse = asLsmCastRecordNumberLsmTemplateData(
    ZO_ShallowTableCopy(defaultXMLTemplates)
  )

  if (optionTemplates !== undefined) {
    for (const [entryType] of pairs(defaultXMLTemplates)) {
      if (asLsmCastRecordNumberUnknown(optionTemplates)[entryType] !== undefined) {
        zo_mixin(
          asObject(xmLrowTemplatesToUse[entryType]),
          asObject(asLsmCastRecordNumberObject(optionTemplates)[entryType])
        )
      }
    }
  }
  this.XMLRowTemplates = xmLrowTemplatesToUse

  const customHighlightTemplateForAllEntryTypes =
    options && getValueOrCallback(asLsmCastRecordStringUnknown(options).highlightTemplate, options)
  const customHighlightColorForAllEntryTypes =
    options && getValueOrCallback(asLsmCastRecordStringUnknown(options).highlightColor, options)

  const optionHighlightTemplates =
    options &&
    getValueOrCallback(asLsmCastRecordStringUnknown(options).XMLRowHighlightTemplates, options)

  const xmLrowHighlightTemplatesToUse = asLsmCastRecordNumberRecordStringUnknown(
    ZO_ShallowTableCopy(defaultXMLHighlightTemplates)
  )
  if (
    optionHighlightTemplates ||
    customHighlightTemplateForAllEntryTypes ||
    customHighlightColorForAllEntryTypes
  ) {
    for (const [entryType] of pairs(defaultXMLHighlightTemplates)) {
      const highlightTemplateForEntryType = asLsmCastRecordStringUnknown(
        xmLrowHighlightTemplatesToUse[entryType]
      )
      if (
        optionHighlightTemplates &&
        asLsmCastRecordNumberUnknown(optionHighlightTemplates)[entryType]
      ) {
        zo_mixin(
          highlightTemplateForEntryType,
          asObject(asLsmCastRecordNumberObject(optionHighlightTemplates)[entryType])
        )
      }

      if (customHighlightTemplateForAllEntryTypes !== undefined) {
        highlightTemplateForEntryType.template = customHighlightTemplateForAllEntryTypes
      }
      if (customHighlightColorForAllEntryTypes !== undefined) {
        highlightTemplateForEntryType.color = customHighlightColorForAllEntryTypes
      }
    }
  }
  this.XMLRowHighlightTemplates = xmLrowHighlightTemplatesToUse

  for (const [entryTypeId, entryTypeIsUsed] of ipairs(LIBRARY_ALLOWED_ENTRY_TYPES)) {
    if (entryTypeIsUsed === true) {
      const [template, rowHeight, setupFunc, widthPadding] = getTemplateData(
        entryTypeId,
        xmLrowTemplatesToUse
      )
      this.AddCustomEntryTemplate(template, rowHeight, setupFunc, widthPadding)
    }
  }

  const normalEntryHeight = asNumber(
    asLsmTemplateData(xmLrowTemplatesToUse[LSM_ENTRY_TYPE_NORMAL]).rowHeight
  )
  this.baseEntryHeight = normalEntryHeight
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      89,
      tos(normalEntryHeight),
      tos(asLsmTemplateData(xmLrowTemplatesToUse[LSM_ENTRY_TYPE_DIVIDER]).rowHeight),
      tos(asLsmTemplateData(xmLrowTemplatesToUse[LSM_ENTRY_TYPE_HEADER]).rowHeight),
      tos(asLsmTemplateData(xmLrowTemplatesToUse[LSM_ENTRY_TYPE_CHECKBOX]).rowHeight),
      tos(asLsmTemplateData(xmLrowTemplatesToUse[LSM_ENTRY_TYPE_BUTTON]).rowHeight),
      tos(asLsmTemplateData(xmLrowTemplatesToUse[LSM_ENTRY_TYPE_RADIOBUTTON]).rowHeight)
    )
  }
}
