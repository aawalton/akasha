import type { Page } from "@akasha/pages-core/page-types"
import { toNumber } from "@akasha/pages-core/property-types/number"
import { z } from "zod"

export const LocationPinSchema = z.object({
  id: z.string(),
  title: z.string(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  address: z.string().optional(),
  scheduledStart: z.string().optional(),
  scheduledEnd: z.string().optional(),
  colorToken: z.string().optional(),
})

export type LocationPin = z.infer<typeof LocationPinSchema>

export function toPins(rows: readonly Page[]): readonly LocationPin[] {
  const pins: LocationPin[] = []
  for (const row of rows) {
    const latitude = toNumber(row.latitude ?? null)
    const longitude = toNumber(row.longitude ?? null)
    if (latitude === null || longitude === null) continue
    const candidate = {
      id: row.id,
      title:
        typeof row.title === "string" && row.title.length > 0 ? row.title : "Untitled location",
      latitude,
      longitude,
      address: typeof row.address === "string" && row.address.length > 0 ? row.address : undefined,
      scheduledStart:
        typeof row.scheduledStart === "string" && row.scheduledStart.length > 0
          ? row.scheduledStart
          : undefined,
      scheduledEnd:
        typeof row.scheduledEnd === "string" && row.scheduledEnd.length > 0
          ? row.scheduledEnd
          : undefined,
    }
    const parsed = LocationPinSchema.safeParse(candidate)
    if (parsed.success) pins.push(parsed.data)
  }
  return pins
}
