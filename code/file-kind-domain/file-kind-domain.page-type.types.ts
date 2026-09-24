import type { NamePatterns } from "akasha/code/properties/name-patterns.text-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type FileKindDomain = Domain & {
  namePatterns: NamePatterns
}
