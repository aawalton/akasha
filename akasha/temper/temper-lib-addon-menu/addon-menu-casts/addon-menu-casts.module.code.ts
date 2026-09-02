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
} from "../addon-menu-types/addon-menu-types.module.code.ts"

export type Thunk<T> = (this: void) => T

export function asThunk<T>(value: unknown): Thunk<T> {
  return value as Thunk<T>
}

export type GlobalTable = Record<string, LamControl | undefined>

export type EsoHandler = (this: void, ...args: unknown[]) => void

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

export type LamWidgetDataArray = LamWidgetData[]

export function asLamWidgetDataArray(value: unknown): LamWidgetDataArray {
  return value as LamWidgetDataArray
}

export function asLamFactory(value: unknown): LamFactory {
  return value as LamFactory
}

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export interface ReopenSaveData {
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

export type HookTable = Record<string, unknown>

export function asHookTable(value: unknown): HookTable {
  return value as HookTable
}

export type SortKeyTable = Record<string, ZoSortKeyConfig>

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

export type SoundName = string

export function asSoundName(value: unknown): SoundName {
  return value as SoundName
}

export function asNumber(value: unknown): number {
  return value as number
}

export type UnknownArray = unknown[]

export function asUnknownArray(value: unknown): UnknownArray {
  return value as UnknownArray
}

export function asSliderData(value: unknown): SliderData {
  return value as SliderData
}

export type SliderDefault = number | ((this: void) => number) | undefined

export function asSliderDefault(value: unknown): SliderDefault {
  return value as SliderDefault
}

export function asZoComboBoxItem(value: unknown): ZoComboBoxItem {
  return value as ZoComboBoxItem
}

export type UpdateChoicesFn = (this: LamControl, ...args: unknown[]) => void

export function asUpdateChoicesFn(value: unknown): UpdateChoicesFn {
  return value as UpdateChoicesFn
}
