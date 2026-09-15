import type { TrackingCapture } from "akasha/alan/track/tracking-capture/tracking-capture.page-type.types.ts"

export const measurement = {
  id: "01a0a01b-1686-7368-833b-6ed4dae6d46e",
  type: "page-type/tracking-capture",
  slug: "measurement",
  definition: "a device measuring it",
} as const satisfies TrackingCapture
