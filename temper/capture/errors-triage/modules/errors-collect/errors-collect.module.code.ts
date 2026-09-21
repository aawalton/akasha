import { ERRORS_CAPTURE_DESCRIPTOR } from "akasha/temper/capture/error/modules/errors-descriptor/errors-descriptor.module.code.ts"
import type { ErrorEntry } from "akasha/temper/capture/error/modules/errors-payload/errors-payload.module.code.ts"
import type { rootSchema } from "akasha/temper/capture/errors-triage/modules/errors-saved-variables/errors-saved-variables.module.code.ts"

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
