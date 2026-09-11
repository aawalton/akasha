import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { Chosen } from "akasha/story/decisions/properties/chosen.text-property.types.ts"
import type { DecisionEffect } from "akasha/story/decisions/properties/decision-effect.text-property.types.ts"
import type { DecisionOptions } from "akasha/story/decisions/properties/decision-options.text-property.types.ts"
import type { DecisionType } from "akasha/story/decisions/properties/decision-type.select-property.types.ts"
import type { Prose } from "akasha/story/stories-played/properties/prose.file-property.ts"
import type { World } from "akasha/story/stories-played/properties/world.relation-property.types.ts"
import type { ChapterNumber } from "akasha/story/wiki-entries/properties/chapter-number.number-property.types.ts"

export type StoryDecision = Page & {
  title: Title
  world?: World
  chapterNumber?: ChapterNumber
  decisionType?: DecisionType
  options?: DecisionOptions
  chosen?: Chosen
  effect?: DecisionEffect
  prose?: Prose
}
