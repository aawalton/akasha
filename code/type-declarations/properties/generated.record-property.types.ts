import type { SourceVersion } from "akasha/code/type-declarations/properties/source-version.number-property.types.ts"
import type { WrittenBy } from "akasha/code/type-declarations/properties/written-by.text-property.types.ts"

export type Generated = {
  writtenBy: WrittenBy
  sourceVersion?: SourceVersion
}
