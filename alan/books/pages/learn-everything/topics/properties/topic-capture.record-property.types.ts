import type { CaptureSource } from "akasha/alan/books/pages/learn-everything/topics/properties/capture-source.text-property.types.ts"
import type { CaptureThroughAt } from "akasha/alan/books/pages/learn-everything/topics/properties/capture-through-at.instant-property.types.ts"
import type { CaptureThroughLine } from "akasha/alan/books/pages/learn-everything/topics/properties/capture-through-line.number-property.types.ts"

export type TopicCapture = {
  captureSource: CaptureSource
  captureThroughLine: CaptureThroughLine
  captureThroughAt: CaptureThroughAt
}
