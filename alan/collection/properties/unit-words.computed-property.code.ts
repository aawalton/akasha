import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { UnitWords } from "akasha/alan/collection/properties/unit-words.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"

type Weighed = { readonly words?: number }

export const work: Work<Collection, UnitWords> = (page, reach) => {
  const named = page.unit
  if (named === undefined) return null
  const unit = reach.target<Weighed>(named)
  return unit === null ? null : (unit.words ?? null)
}
