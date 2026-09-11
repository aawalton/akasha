import type { Said } from "akasha/commands/properties/said.text-property.types.ts"
import type { Takes } from "akasha/commands/properties/takes.text-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Taking = List<{
  said: Said
  takes: Takes
}>
