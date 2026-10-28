import type { StreamingService } from "akasha/alan/collection/properties/streaming-service.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type PartsStreamingOn = List<{
  service: StreamingService
}>
