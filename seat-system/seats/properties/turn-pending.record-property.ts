import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { Compacting } from "./compacting.boolean-property.ts"
import type { LiveShell } from "./live-shell.boolean-property.ts"
import type { LiveSubagent } from "./live-subagent.boolean-property.ts"
import type { SendInFlight } from "./send-in-flight.boolean-property.ts"

export type TurnPending = {
  compacting: Compacting
  liveShell: LiveShell
  liveSubagent: LiveSubagent
  sendInFlight: SendInFlight
}

export const turnPending = {
  id: "01a0541c-db5f-70d8-a32a-c321eef90312",
  pageTypeSlug: "record-property",
  slug: "turn-pending",
  propertySlug: "turn-pending",
  definition: "what a seat is waiting on before its turn is done",
  properties: [
    { pagePropertySlug: "compacting", required: true, many: false },
    { pagePropertySlug: "live-shell", required: true, many: false },
    { pagePropertySlug: "live-subagent", required: true, many: false },
    { pagePropertySlug: "send-in-flight", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A reminder a seat set for itself is no pending turn start.",
    },
  ],
} as const satisfies RecordProperty
