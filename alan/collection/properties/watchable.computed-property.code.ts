import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { PartsStreamingOn } from "akasha/alan/collection/properties/parts-streaming-on.computed-property.types.ts"
import type { Watchable } from "akasha/alan/collection/properties/watchable.computed-property.types.ts"
import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

type Held = Collection & { readonly partsStreamingOn?: PartsStreamingOn }

export const work: Work<Held, Watchable> = (page, reach) => {
  for (const one of page.partsStreamingOn ?? []) {
    const service = reach.target<StreamingService>(one.service)
    if (service?.held === true) return true
  }
  return false
}
