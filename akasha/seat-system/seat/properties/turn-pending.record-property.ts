import type { RecordProperty } from "../../../pages-system/record-property/record-property.page-type.ts"
import type { LiveChild } from "./live-child.boolean-property.ts"
import type { OpenQuestion } from "./open-question.boolean-property.ts"
import type { Owed } from "./owed.boolean-property.ts"
import type { SendInFlight } from "./send-in-flight.boolean-property.ts"

export type TurnPending = {
  liveChild: LiveChild
  sendInFlight: SendInFlight
  owed: Owed
  openQuestion: OpenQuestion
}

export const turnPending = {
  id: "01a05035-2609-7325-b92e-ce7862a8d24c",
  pageTypeSlug: "record-property",
  slug: "turn-pending",
  definition: "what a seat is waiting on before its turn is done",
  properties: [
    { pagePropertySlug: "live-child", required: true, many: false },
    { pagePropertySlug: "send-in-flight", required: true, many: false },
    { pagePropertySlug: "owed", required: true, many: false },
    { pagePropertySlug: "open-question", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat whose turn waits on none of these is done and can be given more work.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The old system records when each of these was last observed, and that is dropped here.",
    },
    {
      invariantKind: "gap",
      statement: "Each of these carries when it was observed.",
    },
  ],
} as const satisfies RecordProperty
