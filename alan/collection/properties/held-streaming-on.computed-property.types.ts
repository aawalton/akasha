import type { StreamingService } from "akasha/alan/collection/properties/streaming-service.relation-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type HeldStreamingOn = List<{
  service: StreamingService
}>
