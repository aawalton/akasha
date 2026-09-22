import { asLsmCastRecordStringUnknown } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asNumber } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"
import { lib } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-state/scrollable-menu-state.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-combobox-base-shapes/scrollable-menu-combobox-base-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-library-shapes/scrollable-menu-library-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const constants = lib.constants

export const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)

const ENTRY_TYPE_DEFAULTS = asLsmCastRecordStringUnknown(entryTypeConstants.defaults)

const entryTypeDefaultsHighlights = asLsmCastRecordStringUnknown(ENTRY_TYPE_DEFAULTS.highlights)

export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL = asNumber(
  entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL
)

const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SUBMENU = asNumber(
  entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SUBMENU
)

export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER = asNumber(
  entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER
)

export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER = asNumber(
  entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER
)

export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX = asNumber(
  entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX
)

export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON = asNumber(
  entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON
)

export const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON = asNumber(
  entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON
)

const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX = asNumber(
  entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX
)

const TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER = asNumber(
  entryTypeConstants.TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER
)

export function getDefaultXMLTemplates(
  this: void,
  selfVar: ComboBoxBase
): LuaMultiReturn<[Record<number, LsmTemplateData>, Record<number, Record<string, unknown>>]> {
  const defaultXMLTemplates: Record<number, LsmTemplateData> = {
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL]: {
      template: "TemperScrollableMenu_ComboBoxEntry",
      rowHeight: ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT,
      setupFunc: function (
        this: void,
        control: Control,
        data: Record<string, unknown>,
        list: unknown
      ): undefined {
        selfVar.SetupEntryLabel(control, data, list, TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL)
      },
    },
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SUBMENU]: {
      template: "TemperScrollableMenu_ComboBoxSubmenuEntry",
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
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER]: {
      template: "TemperScrollableMenu_ComboBoxDividerEntry",
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
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER]: {
      template: "TemperScrollableMenu_ComboBoxHeaderEntry",
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
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX]: {
      template: "TemperScrollableMenu_ComboBoxCheckboxEntry",
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
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON]: {
      template: "TemperScrollableMenu_ComboBoxButtonEntry",
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
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON]: {
      template: "TemperScrollableMenu_ComboBoxRadioButtonEntry",
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
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX]: {
      template: "TemperScrollableMenu_ComboBoxEditBoxEntry",
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
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER]: {
      template: "TemperScrollableMenu_ComboBoxSliderEntry",
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
  const greenHighlight = entryTypeDefaultsHighlights.TEMPER_SCROLLABLE_MENU_ROW_HIGHLIGHT_GREEN
  const defaultXMLHighlightTemplates: Record<number, Record<string, unknown>> = {
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_NORMAL]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SUBMENU]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      templateSubMenuWithCallback: greenHighlight,
      color: defaultHighlightColor,
    },
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_DIVIDER]: {
      template: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_HEADER]: {
      template: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_CHECKBOX]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_BUTTON]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_RADIOBUTTON]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_EDITBOX]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
    [TEMPER_SCROLLABLE_MENU_ENTRY_TYPE_SLIDER]: {
      template: defaultHighlightTemplate,
      templateContextMenuOpeningControl: defaultHighlightTemplate,
      color: defaultHighlightColor,
    },
  }
  return $multi(defaultXMLTemplates, defaultXMLHighlightTemplates)
}
