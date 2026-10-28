import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import {
  type Left,
  servicesLeft,
} from "akasha/alan/collection/modules/services-left/services-left.computed-property-module.code.ts"
import type { HeldStreamingOn } from "akasha/alan/collection/properties/held-streaming-on.computed-property.types.ts"
import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

type Held = Collection & Left

export const work: Work<Held, HeldStreamingOn> = (page, reach) => {
  const kept = new Set<string>()
  for (const one of servicesLeft(page)) {
    if (reach.target<StreamingService>(one)?.held === true) kept.add(one)
  }
  if (kept.size === 0) return null
  return [...kept].sort().map((service) => ({ service }))
}
