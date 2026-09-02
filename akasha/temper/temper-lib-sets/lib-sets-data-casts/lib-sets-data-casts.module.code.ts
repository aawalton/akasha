export function asUnknown(value: boolean): unknown {
  return value as unknown
}

export type NumKeyedNumRecord = { [k: number]: { [setId: number]: unknown } }
export function asNumKeyedNumRecord(value: unknown): NumKeyedNumRecord {
  return value as NumKeyedNumRecord
}

export type NumToNumRecord = { [wayshrineNodeIndex: number]: number }
export function asNumToNumRecord(value: unknown): NumToNumRecord {
  return value as NumToNumRecord
}

export type NoSetIdSetsElement = LibSetsApi["noSetIdSets"][number]
export function asNoSetIdSetsElement(value: unknown): NoSetIdSetsElement {
  return value as NoSetIdSetsElement
}

export type SetInfoElement = LibSetsApi["setInfo"][number]
export function asSetInfoElement(value: unknown): SetInfoElement {
  return value as SetInfoElement
}
