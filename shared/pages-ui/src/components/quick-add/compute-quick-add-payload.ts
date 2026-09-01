import type { ReadonlyJSONValue } from "@akasha/pages-core/schema/pages"
import type { QuickAddConfig } from "@akasha/pages-core/schema/quick-add"

function toJSONValue(v: unknown): ReadonlyJSONValue {
  if (v === null || v === undefined) return null
  if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") return v
  if (Array.isArray(v)) return v.map(toJSONValue)
  if (typeof v === "object") {
    const out: { [k: string]: ReadonlyJSONValue } = {}
    for (const [k, vv] of Object.entries(v)) out[k] = toJSONValue(vv)
    return out
  }
  return null
}

export interface QuickAddPayloadInput {
  readonly cleanTitle: string
  readonly notes: string
  readonly parsedBySigil: Readonly<Record<string, readonly string[]>>
  readonly dismissedDefaultsBySigil: Readonly<Record<string, readonly string[]>>
  readonly pickerValues: Readonly<Record<string, string>>
}

export function computeQuickAddPayload(
  config: QuickAddConfig,
  input: QuickAddPayloadInput
): Readonly<Record<string, ReadonlyJSONValue>> {
  const out: Record<string, ReadonlyJSONValue> = {}

  const fixed = config.fixedDefaults ?? {}
  for (const [k, v] of Object.entries(fixed)) {
    out[k] = toJSONValue(v)
  }

  out[config.titlePropertyId] = input.cleanTitle

  for (const slot of config.inlineTokens ?? []) {
    const parsed = input.parsedBySigil[slot.sigil] ?? []
    const dismissed = input.dismissedDefaultsBySigil[slot.sigil] ?? []
    const defaults = (slot.defaults ?? []).map((t) => t.toLowerCase())
    const activeDefaults = defaults.filter((t) => !dismissed.includes(t) && !parsed.includes(t))
    const lowParsed = parsed.map((t) => t.toLowerCase())
    const merged: string[] = []
    for (const t of activeDefaults) if (!merged.includes(t)) merged.push(t)
    for (const t of lowParsed) if (!merged.includes(t)) merged.push(t)
    out[slot.propertyId] = merged
  }

  for (const slot of config.pickers ?? []) {
    const override = input.pickerValues[slot.propertyId]
    const value = override ?? slot.defaultValue
    if (value !== undefined && value !== "") {
      out[slot.propertyId] = value
    }
  }

  if (config.notesPropertyId !== undefined) {
    out[config.notesPropertyId] = input.notes
  }

  return out
}
