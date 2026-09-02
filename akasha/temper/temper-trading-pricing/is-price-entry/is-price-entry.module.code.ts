import type { TTCPriceEntry } from "../pricing-types/pricing-types.module.code.ts"

export function isPriceEntry(value: unknown): value is TTCPriceEntry {
  return (
    typeof value === "object" &&
    value !== null &&
    ("S" in value || "A" in value || "SA" in value || "N" in value)
  )
}
