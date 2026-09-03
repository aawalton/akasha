import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { LiveChild } from "./live-child.boolean-property.ts"
import type { Owed } from "./owed.boolean-property.ts"
import type { RunningTask } from "./running-task.boolean-property.ts"
import type { SendInFlight } from "./send-in-flight.boolean-property.ts"

export type TurnPending = {
  runningTask: RunningTask
  liveChild: LiveChild
  sendInFlight: SendInFlight
  owed: Owed
}

export const turnPending = {
  id: "01a0541c-db5f-70d8-a32a-c321eef90312",
  pageTypeSlug: "record-property",
  slug: "turn-pending",
  propertySlug: "turn-pending",
  definition: "what a seat is waiting on before its turn is done",
  properties: [
    { pagePropertySlug: "running-task", required: true, many: false },
    { pagePropertySlug: "live-child", required: true, many: false },
    { pagePropertySlug: "send-in-flight", required: true, many: false },
    { pagePropertySlug: "owed", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A reminder a seat set for itself is no pending turn start.",
    },
  ],
} as const satisfies RecordProperty
