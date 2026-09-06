import type { RecordProperty } from "@akasha/pages/record-property"
import type { AccuracySeconds } from "./accuracy-seconds.number-property.ts"
import type { After } from "./after.text-property.ts"
import type { BootDelaySeconds } from "./boot-delay-seconds.number-property.ts"
import type { CatchUp } from "./catch-up.boolean-property.ts"
import type { IntervalSeconds } from "./interval-seconds.number-property.ts"
import type { JitterSeconds } from "./jitter-seconds.number-property.ts"
import type { KillMode } from "./kill-mode.select-property.ts"
import type { Nice } from "./nice.number-property.ts"
import type { PartOf } from "./part-of.text-property.ts"
import type { Restart } from "./restart.select-property.ts"
import type { RestartDelaySeconds } from "./restart-delay-seconds.number-property.ts"
import type { RestartForceExitStatus } from "./restart-force-exit-status.number-property.ts"
import type { Schedule } from "./schedule.text-property.ts"
import type { StartLimitIntervalSeconds } from "./start-limit-interval-seconds.number-property.ts"
import type { StartTimeoutSeconds } from "./start-timeout-seconds.number-property.ts"
import type { StopTimeoutSeconds } from "./stop-timeout-seconds.number-property.ts"
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
  stopTimeoutSeconds?: StopTimeoutSeconds
  stops?: readonly Stops[]
  startLimitIntervalSeconds?: StartLimitIntervalSeconds
  killMode?: KillMode
  nice?: Nice
  schedule?: Schedule
  bootDelaySeconds?: BootDelaySeconds
  intervalSeconds?: IntervalSeconds
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
    { pagePropertySlug: "text-property/after", required: false, many: true, maxCount: null },
    { pagePropertySlug: "text-property/wants", required: false, many: true, maxCount: null },
    { pagePropertySlug: "text-property/part-of", required: false, many: false },
    { pagePropertySlug: "select-property/restart", required: false, many: false },
    { pagePropertySlug: "number-property/restart-delay-seconds", required: false, many: false },
    { pagePropertySlug: "number-property/restart-force-exit-status", required: false, many: false },
    { pagePropertySlug: "number-property/success-exit-status", required: false, many: false },
    { pagePropertySlug: "number-property/start-timeout-seconds", required: false, many: false },
    { pagePropertySlug: "number-property/stop-timeout-seconds", required: false, many: false },
    { pagePropertySlug: "text-property/stops", required: false, many: true, maxCount: null },
    {
      pagePropertySlug: "number-property/start-limit-interval-seconds",
      required: false,
      many: false,
    },
    { pagePropertySlug: "select-property/kill-mode", required: false, many: false },
    { pagePropertySlug: "number-property/nice", required: false, many: false },
    { pagePropertySlug: "text-property/schedule", required: false, many: false },
    { pagePropertySlug: "number-property/boot-delay-seconds", required: false, many: false },
    { pagePropertySlug: "number-property/interval-seconds", required: false, many: false },
    { pagePropertySlug: "number-property/jitter-seconds", required: false, many: false },
    { pagePropertySlug: "number-property/accuracy-seconds", required: false, many: false },
    { pagePropertySlug: "boolean-property/catch-up", required: false, many: false },
    { pagePropertySlug: "text-property/wanted-by", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One record holds every option the unit states.",
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
