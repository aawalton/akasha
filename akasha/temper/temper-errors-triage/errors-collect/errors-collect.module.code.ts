import { ERRORS_CAPTURE_DESCRIPTOR } from "@akasha/temper-capture-errors/errors-descriptor"
import type { ErrorEntry } from "@akasha/temper-capture-errors/errors-payload"
import type { rootSchema } from "../errors-saved-variables/errors-saved-variables.module.code.ts"

export const SAVED_VARIABLES_NAME = ERRORS_CAPTURE_DESCRIPTOR.savedVariablesName

export function collectEntries(parsed: ReturnType<typeof rootSchema.parse>): readonly ErrorEntry[] {
  const defaultTable = parsed.Default
  if (defaultTable === undefined) return []
  const collected: ErrorEntry[] = []
  for (const account of Object.values(defaultTable)) {
    const entries = account.$AccountWide?.entries
    if (entries === undefined) continue
    for (const entry of entries) collected.push(entry)
  }
  return collected
}
