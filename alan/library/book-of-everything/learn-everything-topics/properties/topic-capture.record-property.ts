import type { RecordProperty } from "@akasha/pages-system/record-property"
import type { CaptureSource } from "./capture-source.text-property.ts"
import type { CaptureThroughAt } from "./capture-through-at.instant-property.ts"
import type { CaptureThroughLine } from "./capture-through-line.number-property.ts"

export type TopicCapture = {
  captureSource: CaptureSource
  captureThroughLine: CaptureThroughLine
  captureThroughAt: CaptureThroughAt
}

export const topicCapture = {
  id: "01a0659f-93da-7010-a67c-81b8b0e31d4b",
  pageTypeSlug: "record-property",
  slug: "topic-capture",
  propertySlug: "capture",
  definition: "the transcript a topic's score was read out of, and how far it was read",
  properties: [
    { pagePropertySlug: "capture-source", required: true, many: false },
    { pagePropertySlug: "capture-through-line", required: true, many: false },
    { pagePropertySlug: "capture-through-at", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A topic scored from Alan's own words in the room states no capture.",
    },
  ],
} as const satisfies RecordProperty
