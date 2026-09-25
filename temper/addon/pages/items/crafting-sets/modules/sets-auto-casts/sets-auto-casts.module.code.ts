import "akasha/temper/addon/pages/items/crafting-sets/sets-constant-shapes/sets-constant-shapes.type-declaration.d.ts"

type LibSlashCommanderLibHandle = LibSlashCommanderLib
export function asLibSlashCommanderLibHandle(value: unknown): LibSlashCommanderLibHandle {
  return value as LibSlashCommanderLibHandle
}

type SetNamesByLangRecord = { [setId: number]: { [lang: string]: unknown } } | undefined
export function asSetNamesByLangRecord(value: unknown): SetNamesByLangRecord {
  return value as SetNamesByLangRecord
}

type LabelRecord = { [label: string]: string }
export function asLabelRecord(value: unknown): LabelRecord {
  return value as LabelRecord
}
