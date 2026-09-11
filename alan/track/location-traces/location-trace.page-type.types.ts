import type { AccuracyM } from "akasha/alan/track/location-traces/properties/accuracy-m.number-property.types.ts"
import type { AltitudeAccuracyM } from "akasha/alan/track/location-traces/properties/altitude-accuracy-m.number-property.types.ts"
import type { AltitudeM } from "akasha/alan/track/location-traces/properties/altitude-m.number-property.types.ts"
import type { BatteryIsCharging } from "akasha/alan/track/location-traces/properties/battery-is-charging.boolean-property.types.ts"
import type { BatteryLevel } from "akasha/alan/track/location-traces/properties/battery-level.number-property.types.ts"
import type { ClientSeq } from "akasha/alan/track/location-traces/properties/client-seq.number-property.types.ts"
import type { DeviceId } from "akasha/alan/track/location-traces/properties/device-id.text-property.ts"
import type { HeadingDeg } from "akasha/alan/track/location-traces/properties/heading-deg.number-property.types.ts"
import type { IsMoving } from "akasha/alan/track/location-traces/properties/is-moving.boolean-property.types.ts"
import type { OdometerM } from "akasha/alan/track/location-traces/properties/odometer-m.number-property.types.ts"
import type { SpeedMps } from "akasha/alan/track/location-traces/properties/speed-mps.number-property.types.ts"
import type { TraceActivityType } from "akasha/alan/track/location-traces/properties/trace-activity-type.text-property.ts"
import type { TraceCapturedAt } from "akasha/alan/track/location-traces/properties/trace-captured-at.instant-property.types.ts"
import type { TraceLatitude } from "akasha/alan/track/location-traces/properties/trace-latitude.number-property.types.ts"
import type { TraceLongitude } from "akasha/alan/track/location-traces/properties/trace-longitude.number-property.types.ts"
import type { TraceSource } from "akasha/alan/track/location-traces/properties/trace-source.text-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

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
