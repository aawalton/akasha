import type { RecordProperty } from "@akasha/pages-system/record-property"
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
    { pagePropertySlug: "after", required: false, many: true, max: null },
    { pagePropertySlug: "wants", required: false, many: true, max: null },
    { pagePropertySlug: "part-of", required: false, many: false },
    { pagePropertySlug: "restart", required: false, many: false },
    { pagePropertySlug: "restart-delay-seconds", required: false, many: false },
    { pagePropertySlug: "restart-force-exit-status", required: false, many: false },
    { pagePropertySlug: "success-exit-status", required: false, many: false },
    { pagePropertySlug: "start-timeout-seconds", required: false, many: false },
    { pagePropertySlug: "stop-timeout-seconds", required: false, many: false },
    { pagePropertySlug: "stops", required: false, many: true, max: null },
    { pagePropertySlug: "start-limit-interval-seconds", required: false, many: false },
    { pagePropertySlug: "kill-mode", required: false, many: false },
    { pagePropertySlug: "nice", required: false, many: false },
    { pagePropertySlug: "schedule", required: false, many: false },
    { pagePropertySlug: "boot-delay-seconds", required: false, many: false },
    { pagePropertySlug: "interval-seconds", required: false, many: false },
    { pagePropertySlug: "jitter-seconds", required: false, many: false },
    { pagePropertySlug: "accuracy-seconds", required: false, many: false },
    { pagePropertySlug: "catch-up", required: false, many: false },
    { pagePropertySlug: "wanted-by", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One record holds every option the unit states.",
    },
    {
      invariantKind: "departure",
      statement: "What a timer states stands here beside what a service states.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The exit code preventing a restart is the one option a service states uncarried here.",
    },
  ],
} as const satisfies RecordProperty
