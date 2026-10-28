import type { PartsStreamingOn } from "akasha/alan/collection/properties/parts-streaming-on.computed-property.types.ts"

export type Left = {
  readonly partsStreamingOn?: PartsStreamingOn
  readonly streamingOn?: readonly string[]
  readonly completion?: string
}

const COMPLETED = "completed"

export function servicesLeft(page: Left): readonly string[] {
  const own = page.completion === COMPLETED ? [] : (page.streamingOn ?? [])
  return [...own, ...(page.partsStreamingOn ?? []).map((one) => one.service)]
}
