import { isObjectRecord } from "akasha/code/type/narrowing/modules/is-object-record/is-object-record.module.code.ts"
export function getTemperCharactersData(): Record<string, unknown> | undefined {
  return accountWideRecord("characters")
}

export function chosenBuildOf(this: void, charId: string): string | undefined {
  const chosen = accountWideRecord("activeBuilds")?.[charId]
  return typeof chosen === "string" ? chosen : undefined
}

function accountWideRecord(key: string): Record<string, unknown> | undefined {
  const g: Record<string, unknown> = globalThis
  const tcSv = g["TemperCharacters_SavedVariables"]
  if (!isObjectRecord(tcSv)) return undefined
  const defaultTable = tcSv["Default"]
  if (!isObjectRecord(defaultTable)) return undefined
  let accountWide: Record<string, unknown> | undefined
  for (const key of Object.keys(defaultTable)) {
    if (key.startsWith("@")) {
      const accountTable = defaultTable[key]
      if (!isObjectRecord(accountTable)) continue
      const inner = accountTable["$AccountWide"]
      if (isObjectRecord(inner)) {
        accountWide = inner
        break
      }
    }
  }
  if (!accountWide) return undefined
  const held = accountWide[key]
  return isObjectRecord(held) ? held : undefined
}
