import type { LevelName } from "akasha/command/properties/level-name.text-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type Namespace = Domain & {
  name?: LevelName
}
