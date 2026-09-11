import {
  type LockedFacet,
  lockedFacetSchema,
} from "akasha/pages/core/schema/view-data-locked/view-data-locked.module.code.ts"
import * as z from "zod"

export const navConfigSchema = z
  .object({
    locked: lockedFacetSchema.optional(),
  })
  .passthrough()

export interface NavConfig {
  locked?: LockedFacet
}

export function parseNavConfig(input: unknown): NavConfig | undefined {
  if (input === undefined || input === null) return undefined
  let candidate: unknown = input
  if (typeof input === "string") {
    try {
      candidate = z.unknown().parse(JSON.parse(input))
    } catch {
      return undefined
    }
  }
  const result = navConfigSchema.safeParse(candidate)
  if (!result.success) return undefined
  return { locked: result.data.locked }
}
