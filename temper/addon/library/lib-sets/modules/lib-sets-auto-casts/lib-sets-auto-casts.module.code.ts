export type LibSlashCommanderLibHandle = LibSlashCommanderLib
export function asLibSlashCommanderLibHandle(value: unknown): LibSlashCommanderLibHandle {
  return value as LibSlashCommanderLibHandle
}

export type SetNamesByLangRecord = { [setId: number]: { [lang: string]: unknown } } | undefined
export function asSetNamesByLangRecord(value: unknown): SetNamesByLangRecord {
  return value as SetNamesByLangRecord
}

export type LabelRecord = { [label: string]: string }
export function asLabelRecord(value: unknown): LabelRecord {
  return value as LabelRecord
}
