import { asLsmCastRecordStringUnknown } from "akasha/temper/addon/pages/lib-scrollable-menu/modules/scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asNumber } from "akasha/temper/addon/pages/lib-scrollable-menu/modules/scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"
import { lib } from "akasha/temper/addon/pages/lib-scrollable-menu/modules/scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-scrollable-menu/scrollable-menu-combobox-base-shapes/scrollable-menu-combobox-base-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-scrollable-menu/scrollable-menu-library-shapes/scrollable-menu-library-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export const constants = lib.constants

export const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)

export const ENTRY_TYPE_DEFAULTS = asLsmCastRecordStringUnknown(entryTypeConstants.defaults)

export const entryTypeDefaultsHighlights = asLsmCastRecordStringUnknown(
  ENTRY_TYPE_DEFAULTS.highlights
)

export const LSM_ENTRY_TYPE_NORMAL = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_NORMAL)

export const LSM_ENTRY_TYPE_SUBMENU = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_SUBMENU)

export const LSM_ENTRY_TYPE_DIVIDER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER)

export const LSM_ENTRY_TYPE_HEADER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_HEADER)

export const LSM_ENTRY_TYPE_CHECKBOX = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_CHECKBOX)

export const LSM_ENTRY_TYPE_BUTTON = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_BUTTON)

export const LSM_ENTRY_TYPE_RADIOBUTTON = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_RADIOBUTTON)

export const LSM_ENTRY_TYPE_EDITBOX = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_EDITBOX)

export const LSM_ENTRY_TYPE_SLIDER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_SLIDER)

export function getDefaultXMLTemplates(
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
