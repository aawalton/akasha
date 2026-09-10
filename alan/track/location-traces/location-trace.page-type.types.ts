import type { Page } from "../../../pages/page.page-type.types.ts"
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
