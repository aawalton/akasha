import type { ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import { jsonEqual } from "@shared/utils-narrow"

export function isPatchNoop(
  current: Readonly<Record<string, unknown>>,
  resolvedSet: Readonly<Record<string, ReadonlyJSONValue>>
): boolean {
  for (const key of Object.keys(resolvedSet)) {
    const currentValue = key in current ? current[key] : null
    const proposedValue = resolvedSet[key]
    if (!jsonEqual(currentValue, proposedValue ?? null)) return false
  }
  return true
}
