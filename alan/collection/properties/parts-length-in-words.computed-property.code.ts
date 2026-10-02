import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import { partOfCollections } from "akasha/alan/collection/properties/part-of-collections.multi-relation-property.ts"
import type { PartsLengthInWords } from "akasha/alan/collection/properties/parts-length-in-words.computed-property.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"
import { chapterStory } from "akasha/story/chapter/properties/chapter-story.relation-property.ts"
import { player } from "akasha/story/chapter/step-status/pages/player.step-status.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"

type Held = { readonly totalLengthInWords?: number; readonly stepStatus?: string }

const PARTED = "/"
const PUBLISHED = `${stepStatus.slug}${PARTED}${player.slug}`

export const work: Work<Collection, PartsLengthInWords> = (_page, reach) => {
  const parts = new Set([
    ...reach.naming<Held>(partOfCollections.propertySlug),
    ...reach.naming<Held>(chapterStory.slug),
  ])
  let total = 0
  for (const one of parts) {
    if (one.stepStatus !== undefined && one.stepStatus !== PUBLISHED) continue
    total += one.totalLengthInWords ?? 0
  }
  return total
}
