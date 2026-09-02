import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { Duration } from "./duration.number-property.ts"
import type { StatusDistance } from "./status-distance.number-property.ts"
import type { StatusMagnitude } from "./status-magnitude.number-property.ts"
import type { StatusName } from "./status-name.text-property.ts"

export type EffectStatus = {
  status?: StatusName
  duration?: Duration
  magnitude?: StatusMagnitude
  distance?: StatusDistance
}

export const effectStatus = {
  id: "01a06196-037b-7292-b3da-52c4a6dc68a0",
  pageTypeSlug: "record-property",
  slug: "effect-status",
  propertySlug: "status",
  definition: "the status an effect applies, and how long it holds",
  properties: [
    { pagePropertySlug: "status-name", required: false, many: false },
    { pagePropertySlug: "duration", required: false, many: false },
    { pagePropertySlug: "status-magnitude", required: false, many: false },
    { pagePropertySlug: "status-distance", required: false, many: false },
  ],
} as const satisfies RecordProperty
