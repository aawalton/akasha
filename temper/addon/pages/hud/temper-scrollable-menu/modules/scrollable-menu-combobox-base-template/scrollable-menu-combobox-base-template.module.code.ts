import {
  asComboBoxBaseClass,
  asDropdownAddTemplate,
  asLsmCastBoolean,
} from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastRecordNumberLsmTemplateData,
  asLsmCastRecordNumberObject,
  asLsmCastRecordNumberRecordStringUnknown,
  asLsmCastRecordNumberUnknown,
  asLsmCastRecordStringUnknown,
} from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-3c/scrollable-menu-casts-3c.module.code.ts"
import {
  asLsmCastUnknown,
  asLsmTemplateData,
  asNumber,
  asObject,
  asString,
} from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { addItemBase } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-combobox-base-data/scrollable-menu-combobox-base-data.module.code.ts"
import { getValueOrCallback } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import {
  entryTypeConstants,
  getDefaultXMLTemplates,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL,
  TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON,
} from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-entry-type-defaults/scrollable-menu-entry-type-defaults.module.code.ts"
import { lib } from "akasha/temper/addon/pages/hud/temper-scrollable-menu/modules/scrollable-menu-state/scrollable-menu-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-scrollable-menu/scrollable-menu-combobox-base-shapes/scrollable-menu-combobox-base-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-scrollable-menu/scrollable-menu-library-shapes/scrollable-menu-library-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-ui/eso-lib-sets-ui.type-declaration.d.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const classes = asLsmCastRecordStringUnknown(lib.classes)
const LIBRARY_ALLOWED_ENTRY_TYPES = asLsmCastBoolean(entryTypeConstants.libraryAllowedEntryTypes)

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
    asLsmTemplateData(xmLrowTemplatesToUse[TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL]).rowHeight
  )
  this.baseEntryHeight = normalEntryHeight
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      89,
      tos(normalEntryHeight),
      tos(
        asLsmTemplateData(xmLrowTemplatesToUse[TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER]).rowHeight
      ),
      tos(
        asLsmTemplateData(xmLrowTemplatesToUse[TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER]).rowHeight
      ),
      tos(
        asLsmTemplateData(xmLrowTemplatesToUse[TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX])
          .rowHeight
      ),
      tos(
        asLsmTemplateData(xmLrowTemplatesToUse[TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON]).rowHeight
      ),
      tos(
        asLsmTemplateData(xmLrowTemplatesToUse[TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON])
          .rowHeight
      )
    )
  }
}
