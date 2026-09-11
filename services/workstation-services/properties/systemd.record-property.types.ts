import type { AccuracySeconds } from "akasha/services/workstation-services/properties/accuracy-seconds.number-property.types.ts"
import type { After } from "akasha/services/workstation-services/properties/after.text-property.types.ts"
import type { CatchUp } from "akasha/services/workstation-services/properties/catch-up.boolean-property.types.ts"
import type { JitterSeconds } from "akasha/services/workstation-services/properties/jitter-seconds.number-property.types.ts"
import type { PartOf } from "akasha/services/workstation-services/properties/part-of.text-property.types.ts"
import type { Restart } from "akasha/services/workstation-services/properties/restart.select-property.types.ts"
import type { RestartDelaySeconds } from "akasha/services/workstation-services/properties/restart-delay-seconds.number-property.types.ts"
import type { RestartForceExitStatus } from "akasha/services/workstation-services/properties/restart-force-exit-status.number-property.types.ts"
import type { Schedule } from "akasha/services/workstation-services/properties/schedule.text-property.types.ts"
import type { StartLimitIntervalSeconds } from "akasha/services/workstation-services/properties/start-limit-interval-seconds.number-property.types.ts"
import type { StartTimeoutSeconds } from "akasha/services/workstation-services/properties/start-timeout-seconds.number-property.types.ts"
import type { Stops } from "akasha/services/workstation-services/properties/stops.text-property.types.ts"
import type { SuccessExitStatus } from "akasha/services/workstation-services/properties/success-exit-status.number-property.types.ts"
import type { WantedBy } from "akasha/services/workstation-services/properties/wanted-by.text-property.types.ts"
import type { Wants } from "akasha/services/workstation-services/properties/wants.text-property.types.ts"

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
