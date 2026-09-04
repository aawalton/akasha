import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { AccuracyM } from "./properties/accuracy-m.number-property.ts"
import type { AltitudeAccuracyM } from "./properties/altitude-accuracy-m.number-property.ts"
import type { AltitudeM } from "./properties/altitude-m.number-property.ts"
import type { BatteryIsCharging } from "./properties/battery-is-charging.boolean-property.ts"
import type { BatteryLevel } from "./properties/battery-level.number-property.ts"
import type { ClientSeq } from "./properties/client-seq.number-property.ts"
import type { DeviceId } from "./properties/device-id.text-property.ts"
import type { HeadingDeg } from "./properties/heading-deg.number-property.ts"
import type { IsMoving } from "./properties/is-moving.boolean-property.ts"
import type { OdometerM } from "./properties/odometer-m.number-property.ts"
import type { SpeedMps } from "./properties/speed-mps.number-property.ts"
import type { TraceActivityType } from "./properties/trace-activity-type.text-property.ts"
import type { TraceCapturedAt } from "./properties/trace-captured-at.instant-property.ts"
import type { TraceLatitude } from "./properties/trace-latitude.number-property.ts"
import type { TraceLongitude } from "./properties/trace-longitude.number-property.ts"
import type { TraceSource } from "./properties/trace-source.text-property.ts"

export type LocationTrace = Page & {
  accuracyM?: AccuracyM
  altitudeAccuracyM?: AltitudeAccuracyM
  altitudeM?: AltitudeM
  batteryIsCharging?: BatteryIsCharging
  batteryLevel?: BatteryLevel
  clientSeq: ClientSeq
  deviceId: DeviceId
  headingDeg?: HeadingDeg
  isMoving?: IsMoving
  odometerM?: OdometerM
  speedMps?: SpeedMps
  activityType?: TraceActivityType
  capturedAt: TraceCapturedAt
  latitude: TraceLatitude
  longitude: TraceLongitude
  source?: TraceSource
}

export const locationTrace = {
  id: "01a06836-795a-76ec-95fa-2b57e5a7dc38",
  pageTypeSlug: "page-type",
  slug: "location-trace",
  definition: "where Alan's phone put him at one moment",
  pluralSlug: "location-traces",
  partSlugs: [
    "boolean-property/battery-is-charging",
    "boolean-property/is-moving",
    "instant-property/trace-captured-at",
    "number-property/accuracy-m",
    "number-property/altitude-accuracy-m",
    "number-property/altitude-m",
    "number-property/battery-level",
    "number-property/client-seq",
    "number-property/heading-deg",
    "number-property/odometer-m",
    "number-property/speed-mps",
    "number-property/trace-latitude",
    "number-property/trace-longitude",
    "text-property/device-id",
    "text-property/trace-activity-type",
    "text-property/trace-source",
  ],
  extendsSlug: ["page-type/page"],
  properties: [
    { pagePropertySlug: "accuracy-m", required: false, many: false },
    { pagePropertySlug: "altitude-accuracy-m", required: false, many: false },
    { pagePropertySlug: "altitude-m", required: false, many: false },
    { pagePropertySlug: "battery-is-charging", required: false, many: false },
    { pagePropertySlug: "battery-level", required: false, many: false },
    { pagePropertySlug: "client-seq", required: true, many: false },
    { pagePropertySlug: "device-id", required: true, many: false },
    { pagePropertySlug: "heading-deg", required: false, many: false },
    { pagePropertySlug: "is-moving", required: false, many: false },
    { pagePropertySlug: "odometer-m", required: false, many: false },
    { pagePropertySlug: "speed-mps", required: false, many: false },
    { pagePropertySlug: "trace-activity-type", required: false, many: false },
    { pagePropertySlug: "trace-captured-at", required: true, many: false },
    { pagePropertySlug: "trace-latitude", required: true, many: false },
    { pagePropertySlug: "trace-longitude", required: true, many: false },
    { pagePropertySlug: "trace-source", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trace stands as a row on the ESO day the trace was captured in.",
    },
    {
      invariantKind: "departure",
      statement: "A trace is kept as the device reported it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing recomputes a trace from its neighbours.",
    },
    {
      invariantKind: "gap",
      statement: "Every trace Alan's phone sends is kept.",
    },
  ],
} as const satisfies PageType
