import type { AccuracySeconds } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/accuracy-seconds.number-property.types.ts"
import type { After } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/after.text-property.types.ts"
import type { CatchUp } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/catch-up.boolean-property.types.ts"
import type { JitterSeconds } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/jitter-seconds.number-property.types.ts"
import type { PartOf } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/part-of.text-property.types.ts"
import type { Restart } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/restart.select-property.types.ts"
import type { RestartDelaySeconds } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/restart-delay-seconds.number-property.types.ts"
import type { RestartForceExitStatus } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/restart-force-exit-status.number-property.types.ts"
import type { Schedule } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/schedule.text-property.types.ts"
import type { StartLimitIntervalSeconds } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/start-limit-interval-seconds.number-property.types.ts"
import type { StartTimeoutSeconds } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/start-timeout-seconds.number-property.types.ts"
import type { Stops } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/stops.text-property.types.ts"
import type { SuccessExitStatus } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/success-exit-status.number-property.types.ts"
import type { WantedBy } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/wanted-by.text-property.types.ts"
import type { Wants } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/wants.text-property.types.ts"

export type Systemd = {
  after?: After
  wants?: Wants
  partOf?: PartOf
  restart?: Restart
  restartDelaySeconds?: RestartDelaySeconds
  restartForceExitStatus?: RestartForceExitStatus
  successExitStatus?: SuccessExitStatus
  startTimeoutSeconds?: StartTimeoutSeconds
  stops?: Stops
  startLimitIntervalSeconds?: StartLimitIntervalSeconds
  schedule?: Schedule
  jitterSeconds?: JitterSeconds
  accuracySeconds?: AccuracySeconds
  catchUp?: CatchUp
  wantedBy?: WantedBy
}
