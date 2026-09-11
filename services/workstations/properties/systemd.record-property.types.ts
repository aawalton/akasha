import type { AccuracySeconds } from "akasha/services/workstations/properties/accuracy-seconds.number-property.types.ts"
import type { After } from "akasha/services/workstations/properties/after.text-property.types.ts"
import type { CatchUp } from "akasha/services/workstations/properties/catch-up.boolean-property.types.ts"
import type { JitterSeconds } from "akasha/services/workstations/properties/jitter-seconds.number-property.types.ts"
import type { PartOf } from "akasha/services/workstations/properties/part-of.text-property.types.ts"
import type { Restart } from "akasha/services/workstations/properties/restart.select-property.types.ts"
import type { RestartDelaySeconds } from "akasha/services/workstations/properties/restart-delay-seconds.number-property.types.ts"
import type { RestartForceExitStatus } from "akasha/services/workstations/properties/restart-force-exit-status.number-property.types.ts"
import type { Schedule } from "akasha/services/workstations/properties/schedule.text-property.types.ts"
import type { StartLimitIntervalSeconds } from "akasha/services/workstations/properties/start-limit-interval-seconds.number-property.types.ts"
import type { StartTimeoutSeconds } from "akasha/services/workstations/properties/start-timeout-seconds.number-property.types.ts"
import type { Stops } from "akasha/services/workstations/properties/stops.text-property.types.ts"
import type { SuccessExitStatus } from "akasha/services/workstations/properties/success-exit-status.number-property.types.ts"
import type { WantedBy } from "akasha/services/workstations/properties/wanted-by.text-property.types.ts"
import type { Wants } from "akasha/services/workstations/properties/wants.text-property.types.ts"

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
