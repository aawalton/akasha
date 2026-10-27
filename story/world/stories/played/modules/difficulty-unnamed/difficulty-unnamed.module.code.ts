import { relationProperty } from "akasha/page/relation-property/relation-property.page-type.ts"
import { difficulty } from "akasha/story/world/stories/played/properties/difficulty.relation-property.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"

const DECLARED = `${relationProperty.slug}/${difficulty.slug}`

export function levelUnnamed(): string | null {
  for (const one of storyPlayed.properties) {
    if (one.pageProperty !== DECLARED || !("default" in one)) continue
    if (typeof one.default === "string") return one.default
  }
  return null
}
