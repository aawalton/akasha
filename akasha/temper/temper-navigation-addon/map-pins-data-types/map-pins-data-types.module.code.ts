export type PinTuple = readonly (number | string)[]
export type PinList = readonly PinTuple[]

export type SubzonePinTable = Record<string, PinList>

export type NestedPinTable = Record<string, Record<number, PinList>>

export type PoiNameTable = Record<number, Record<number, PinTuple>>

export type IdSet = Record<number, boolean>

export type NameSet = Record<string, boolean>

export type NumberMap = Record<number, number>
export type StringNumberMap = Record<string, number>

export type IconMap = Record<number, string>

export type DescMap = Record<number, string>

export interface TooltipRow {
  readonly v: number
  readonly desc: string
}
export type TooltipTable = readonly TooltipRow[]

export type FishingBugFixTable = Record<number, Record<number, string>>
