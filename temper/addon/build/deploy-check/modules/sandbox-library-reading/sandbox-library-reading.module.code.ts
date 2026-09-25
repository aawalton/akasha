import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import {
  listed,
  sortedWords,
} from "akasha/temper/eso/constant/modules/engine-constants-reading/engine-constants-reading.module.code.ts"
import { accountWideHolding } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"

const TOP_LEVEL = "TemperCatalog_SavedVariables"

const HELD = "sandboxLibraryCatalog"

const NOTHING = 0

export interface SandboxLibrary {
  readonly apiVersion: number
  readonly globals: Readonly<Record<string, string>>
  readonly libraries: Readonly<Record<string, string>>
  readonly members: Readonly<Record<string, readonly string[]>>
}


function sortedMembers(held: unknown): Record<string, readonly string[]> {
  const out: Record<string, readonly string[]> = {}
  if (!isRecord(held)) return out
  for (const name of Object.keys(held).sort()) out[name] = listed(held[name])
  return out
}

export function sandboxLibraryIn(content: string): SandboxLibrary | undefined {
  let root: Record<string, unknown>
  try {
    root = parseLuaSavedVariablesFile(content, TOP_LEVEL)
  } catch {
    return undefined
  }
  const catalog = accountWideHolding(root, HELD)
  if (catalog === undefined) return undefined
  return {
    apiVersion: typeof catalog.apiVersion === "number" ? catalog.apiVersion : NOTHING,
    globals: sortedWords(catalog.globals),
    libraries: sortedWords(catalog.libraries),
    members: sortedMembers(catalog.members),
  }
}

export function sandboxLibraryBody(held: SandboxLibrary): string {
  return `${JSON.stringify(held, null, 2)}\n`
}
