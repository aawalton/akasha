import type { RecordProperty } from "@akasha/pages/record-property"
import type { AccuracySeconds } from "./accuracy-seconds.number-property.ts"
import type { After } from "./after.text-property.ts"
import type { CatchUp } from "./catch-up.boolean-property.ts"
import type { JitterSeconds } from "./jitter-seconds.number-property.ts"
import type { PartOf } from "./part-of.text-property.ts"
import type { Restart } from "./restart.select-property.ts"
import type { RestartDelaySeconds } from "./restart-delay-seconds.number-property.ts"
import type { RestartForceExitStatus } from "./restart-force-exit-status.number-property.ts"
import type { Schedule } from "./schedule.text-property.ts"
import type { StartLimitIntervalSeconds } from "./start-limit-interval-seconds.number-property.ts"
import type { StartTimeoutSeconds } from "./start-timeout-seconds.number-property.ts"
import type { Stops } from "./stops.text-property.ts"
import type { SuccessExitStatus } from "./success-exit-status.number-property.ts"
import type { WantedBy } from "./wanted-by.text-property.ts"
import type { Wants } from "./wants.text-property.ts"

export type Systemd = {
  after?: readonly After[]
  wants?: readonly Wants[]
  partOf?: PartOf
  restart?: Restart
  restartDelaySeconds?: RestartDelaySeconds
  restartForceExitStatus?: RestartForceExitStatus
  successExitStatus?: SuccessExitStatus
  startTimeoutSeconds?: StartTimeoutSeconds
  stops?: readonly Stops[]
  startLimitIntervalSeconds?: StartLimitIntervalSeconds
  schedule?: Schedule
  jitterSeconds?: JitterSeconds
  accuracySeconds?: AccuracySeconds
  catchUp?: CatchUp
  wantedBy?: WantedBy
}

export const systemd = {
  id: "01a05a3f-b42d-7f99-8339-43009bbd74bb",
  pageTypeSlug: "record-property",
  slug: "systemd",
  propertySlug: "systemd",
  definition: "what the unit installed for a service states",
  properties: [
    { pageProperty: "text-property/after", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/wants", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/part-of", required: false, many: false },
    { pageProperty: "select-property/restart", required: false, many: false },
    { pageProperty: "number-property/restart-delay-seconds", required: false, many: false },
    { pageProperty: "number-property/restart-force-exit-status", required: false, many: false },
    { pageProperty: "number-property/success-exit-status", required: false, many: false },
    { pageProperty: "number-property/start-timeout-seconds", required: false, many: false },
    { pageProperty: "text-property/stops", required: false, many: true, maxCount: null },
    {
      pageProperty: "number-property/start-limit-interval-seconds",
      required: false,
      many: false,
    },
    { pageProperty: "text-property/schedule", required: false, many: false },
    { pageProperty: "number-property/jitter-seconds", required: false, many: false },
    { pageProperty: "number-property/accuracy-seconds", required: false, many: false },
    { pageProperty: "boolean-property/catch-up", required: false, many: false },
    { pageProperty: "text-property/wanted-by", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One record has every option the unit states.",
    },
    {
      invariantKind: "departure",
      statement: "The options a timer states sit here beside the options a service states.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The exit code preventing a restart is the one option a service states uncarried here.",
    },
  ],
} as const satisfies RecordProperty
