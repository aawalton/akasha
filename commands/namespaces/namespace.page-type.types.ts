import type { LevelName } from "akasha/commands/properties/level-name.text-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type Namespace = Domain & {
  name?: LevelName
}
