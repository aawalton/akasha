import type {
  AnchorOptions,
  CursorTLC,
  DragData,
  Lib,
  MasterEntry,
  RowData,
  ShifterBox,
  ShifterBoxList,
  ShifterBoxSettings,
  ShifterRowControl,
  ShifterScrollList,
  ShifterScrollListDataEntry,
} from "../shifter-types/shifter-types.module.code.ts"

export type TableKey = AnyNotNil

export function asTableKey(value: unknown): TableKey {
  return value as TableKey
}

export type EntriesTable = LuaTable<AnyNotNil, unknown>

export function asEntriesTable(value: unknown): EntriesTable {
  return value as EntriesTable
}

export function asControl(value: unknown): Control {
  return value as Control
}

export type GlobalTable = Record<string, unknown>

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export type UnknownArray = unknown[]

export function asUnknownArray(value: unknown): UnknownArray {
  return value as UnknownArray
}

export function asLabelControl(value: unknown): LabelControl {
  return value as LabelControl
}

export function asButtonControl(value: unknown): ButtonControl {
  return value as ButtonControl
}

export function asBackdropControl(value: unknown): BackdropControl {
  return value as BackdropControl
}

export function asEditControl(value: unknown): EditControl {
  return value as EditControl
}

export function asCursorTLC(value: unknown): CursorTLC {
  return value as CursorTLC
}

export interface AnimationFieldHolder {
  [animationField: string]: AnimationTimeline | undefined
}

export function asAnimationFieldHolder(value: unknown): AnimationFieldHolder {
  return value as AnimationFieldHolder
}

export function asAnimationTimeline(value: unknown): AnimationTimeline {
  return value as AnimationTimeline
}

export function asShifterRowControl(value: unknown): ShifterRowControl {
  return value as ShifterRowControl
}

export function asShifterScrollList(value: unknown): ShifterScrollList {
  return value as ShifterScrollList
}

export function asShifterBoxList(value: unknown): ShifterBoxList {
  return value as ShifterBoxList
}

export function asShifterBox(value: unknown): ShifterBox {
  return value as ShifterBox
}

export function asShifterBoxSettings(value: unknown): ShifterBoxSettings {
  return value as ShifterBoxSettings
}

export function asLib(value: unknown): Lib {
  return value as Lib
}

export type EventIndexable = Record<string, number>

export function asEventIndexable(value: unknown): EventIndexable {
  return value as EventIndexable
}

export function asRowData(value: unknown): RowData {
  return value as RowData
}

export type ScrollDataList = ShifterScrollListDataEntry[]

export function asScrollDataList(value: unknown): ScrollDataList {
  return value as ScrollDataList
}

export type ScrollDataEntry = ShifterScrollListDataEntry

export function asScrollDataEntry(value: unknown): ScrollDataEntry {
  return value as ScrollDataEntry
}

export function asDragData(value: unknown): DragData {
  return value as DragData
}

export function asMasterEntry(value: unknown): MasterEntry {
  return value as MasterEntry
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asString(value: unknown): string {
  return value as string
}

export type StringRecord = Record<string, unknown>

export function asStringRecord(value: unknown): StringRecord {
  return value as StringRecord
}

export function asAnchorOptions(value: unknown): AnchorOptions {
  return value as AnchorOptions
}

export type NumberPair = [number, number]

export function asNumberPair(value: unknown): NumberPair {
  return value as NumberPair
}

export type EsoHandler = (this: void, ...args: unknown[]) => void

export function asEsoHandler(value: unknown): EsoHandler {
  return value as EsoHandler
}

export type ClickHandler = (this: void, ...args: unknown[]) => unknown

export function asClickHandler(value: unknown): ClickHandler {
  return value as ClickHandler
}
