import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { ActiveTurn } from "./active-turn.boolean-property.ts"
import type { ScannedTo } from "./scanned-to.number-property.ts"

export type TurnWorking = {
  activeTurn: ActiveTurn
  scannedTo: ScannedTo
}

export const turnWorking = {
  id: "01a06c75-5eab-7ec2-b8c4-b25cdb0803ce",
  pageTypeSlug: "record-property",
  slug: "turn-working",
  propertySlug: "turn-working",
  definition: "whether a seat is mid-turn, and the byte that answer was read to",
  properties: [
    { pagePropertySlug: "active-turn", required: true, many: false },
    { pagePropertySlug: "scanned-to", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The answer is read off the seat's transcript rather than off a hook.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript shorter than the byte read to was replaced.",
    },
    {
      invariantKind: "departure",
      statement: "A replaced transcript is read again from its first byte.",
    },
    {
      invariantKind: "absence",
      statement: "New bytes naming no turn of the agent are no answer that the seat is idle.",
    },
  ],
} as const satisfies RecordProperty
