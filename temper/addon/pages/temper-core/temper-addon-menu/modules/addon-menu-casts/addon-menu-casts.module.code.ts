import type {
  AddonListData,
  FaqTextureControl,
  IconControl,
  IconPickerMenu,
  Lam,
  LamControl,
  LamFactory,
  LamWidgetData,
  PanelData,
  SliderData,
  TooltipHostControl,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-types/addon-menu-types.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-eso-combobox/addon-menu-eso-combobox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-eso-controls/addon-menu-eso-controls.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-eso-window/addon-menu-eso-window.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

type Thunk<T> = (this: void) => T

export function asThunk<T>(value: unknown): Thunk<T> {
  return value as Thunk<T>
}

type GlobalTable = Record<string, LamControl | undefined>

type EsoHandler = (this: void, ...args: unknown[]) => void

export function asEsoHandler(value: unknown): EsoHandler {
  return value as EsoHandler
}

export function asLam(value: unknown): Lam {
  return value as Lam
}

export function asControl(value: unknown): Control {
  return value as Control
}

export function asLamControl(value: unknown): LamControl {
  return value as LamControl
}

export function asString(value: unknown): string {
  return value as string
}

export function asPanelData(value: unknown): PanelData {
  return value as PanelData
}

type LamWidgetDataArray = LamWidgetData[]

export function asLamWidgetDataArray(value: unknown): LamWidgetDataArray {
  return value as LamWidgetDataArray
}

export function asLamFactory(value: unknown): LamFactory {
  return value as LamFactory
}

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

interface ReopenSaveData {
  reopenPanel?: string
}

export function asReopenSaveData(value: unknown): ReopenSaveData {
  return value as ReopenSaveData
}

export function asTooltipHostControl(value: unknown): TooltipHostControl {
  return value as TooltipHostControl
}

export function asFaqTextureControl(value: unknown): FaqTextureControl {
  return value as FaqTextureControl
}

export function asZoColorDef(value: unknown): ZoColorDef {
  return value as ZoColorDef
}

export function asTimelineAnimation(value: unknown): TimelineAnimation {
  return value as TimelineAnimation
}

export function asLamComboBox(value: unknown): LamComboBox {
  return value as LamComboBox
}

export function asZoComboBoxRow(value: unknown): ZoComboBoxRow {
  return value as ZoComboBoxRow
}

export function asIconPickerMenu(value: unknown): IconPickerMenu {
  return value as IconPickerMenu
}

export function asIconControl(value: unknown): IconControl {
  return value as IconControl
}

type HookTable = Record<string, unknown>

export function asHookTable(value: unknown): HookTable {
  return value as HookTable
}

type SortKeyTable = Record<string, ZoSortKeyConfig>

export function asZoFadeSceneFragment(value: unknown): ZoFadeSceneFragment {
  return value as ZoFadeSceneFragment
}

export function asEsoDialogDescriptor(value: unknown): EsoDialogDescriptor {
  return value as EsoDialogDescriptor
}

export function asSortKeyTable(value: unknown): SortKeyTable {
  return value as SortKeyTable
}

export function asSelectableLabelControl(value: unknown): SelectableLabelControl {
  return value as SelectableLabelControl
}

export function asAddonListData(value: unknown): AddonListData {
  return value as AddonListData
}

type SoundName = string

export function asSoundName(value: unknown): SoundName {
  return value as SoundName
}

export function asNumber(value: unknown): number {
  return value as number
}

type UnknownArray = unknown[]

export function asUnknownArray(value: unknown): UnknownArray {
  return value as UnknownArray
}

export function asSliderData(value: unknown): SliderData {
  return value as SliderData
}

type SliderDefault = number | ((this: void) => number) | undefined

export function asSliderDefault(value: unknown): SliderDefault {
  return value as SliderDefault
}

export function asZoComboBoxItem(value: unknown): ZoComboBoxItem {
  return value as ZoComboBoxItem
}

type UpdateChoicesFn = (this: LamControl, ...args: unknown[]) => void

export function asUpdateChoicesFn(value: unknown): UpdateChoicesFn {
  return value as UpdateChoicesFn
}
