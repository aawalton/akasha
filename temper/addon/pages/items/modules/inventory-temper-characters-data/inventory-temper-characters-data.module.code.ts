import { isObjectRecord } from "akasha/code/type/narrowing/modules/is-object-record/is-object-record.module.code.ts"
import type { WantedEquipmentSignature } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"

export function getTemperCharactersData(): Record<string, unknown> | undefined {
  return accountWideRecord("characters")
}

export function chosenBuildIn(
  wanted: readonly WantedEquipmentSignature[]
): (this: void, charId: string) => string | undefined {
  return (charId) => {
    const chosen = accountWideRecord("activeBuilds")?.[charId]
    if (!isObjectRecord(chosen) || typeof chosen["buildId"] !== "string") return undefined
    const setUp = wanted.find((one) => one.esoCharId === charId && one.backpack !== true)
    return setUp?.buildId === chosen["over"] ? chosen["buildId"] : undefined
  }
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
