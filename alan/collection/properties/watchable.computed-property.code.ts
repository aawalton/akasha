import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { PartsStreamingOn } from "akasha/alan/collection/properties/parts-streaming-on.computed-property.types.ts"
import type { Watchable } from "akasha/alan/collection/properties/watchable.computed-property.types.ts"
import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

type Held = Collection & {
  readonly partsStreamingOn?: PartsStreamingOn
  readonly streamingOn?: readonly string[]
  readonly completion?: string
}

const COMPLETED = "completed"

function servicesLeft(page: Held): readonly string[] {
  const own = page.completion === COMPLETED ? [] : (page.streamingOn ?? [])
  return [...own, ...(page.partsStreamingOn ?? []).map((one) => one.service)]
}

export const work: Work<Held, Watchable> = (page, reach) => {
  for (const one of servicesLeft(page)) {
    if (reach.target<StreamingService>(one)?.held === true) return true
  }
  return false
}
