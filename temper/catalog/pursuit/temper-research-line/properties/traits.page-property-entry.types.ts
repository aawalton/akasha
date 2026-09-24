import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { TraitIndex } from "akasha/temper/catalog/pursuit/temper-research-line/properties/trait-index.number-property.types.ts"
import type { TraitName } from "akasha/temper/catalog/pursuit/temper-research-line/properties/trait-name.text-property.types.ts"

export type Traits = "jsonl"

export type TraitsRow = {
  id: Id
  traitIndex: TraitIndex
  traitName: TraitName
}
