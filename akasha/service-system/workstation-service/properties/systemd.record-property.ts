import type { RecordProperty } from "../../../pages-system/record-property/record-property.page-type.ts"
import type { CatchUp } from "./catch-up.boolean-property.ts"
import type { JitterSeconds } from "./jitter-seconds.number-property.ts"
import type { Restart } from "./restart.text-property.ts"
import type { RestartDelaySeconds } from "./restart-delay-seconds.number-property.ts"
import type { Schedule } from "./schedule.text-property.ts"
import type { StartTimeoutSeconds } from "./start-timeout-seconds.number-property.ts"

export type Systemd = {
  restart?: Restart
  restartDelaySeconds?: RestartDelaySeconds
  startTimeoutSeconds?: StartTimeoutSeconds
  schedule?: Schedule
  jitterSeconds?: JitterSeconds
  catchUp?: CatchUp
}

export const systemd = {
  id: "01a05a3f-b42d-7f99-8339-43009bbd74bb",
  pageTypeSlug: "record-property",
  slug: "systemd",
  propertySlug: "systemd",
  definition: "what the unit installed for a service states",
  properties: [
    { pagePropertySlug: "restart", required: false, many: false },
    { pagePropertySlug: "restart-delay-seconds", required: false, many: false },
    { pagePropertySlug: "start-timeout-seconds", required: false, many: false },
    { pagePropertySlug: "schedule", required: false, many: false },
    { pagePropertySlug: "jitter-seconds", required: false, many: false },
    { pagePropertySlug: "catch-up", required: false, many: false },
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
      statement: "Six of the seventeen options the services standing today state are carried here.",
    },
  ],
} as const satisfies RecordProperty
