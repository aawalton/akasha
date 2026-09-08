export interface LocationTraceInsert {
  readonly deviceId: string
  readonly clientSeq: number
  readonly capturedAt: string
  readonly latitude: number
  readonly longitude: number
  readonly accuracyM?: number | null
  readonly altitudeM?: number | null
  readonly altitudeAccuracyM?: number | null
  readonly speedMps?: number | null
  readonly headingDeg?: number | null
  readonly isMoving?: boolean | null
  readonly activityType?: string | null
  readonly batteryLevel?: number | null
  readonly batteryIsCharging?: boolean | null
  readonly odometerM?: number | null
  readonly source?: string
}
