import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Prose } from "akasha/story/played/properties/prose.file-property.types.ts"
import type { World } from "akasha/story/played/properties/world.relation-property.types.ts"
import type { ChapterNumber } from "akasha/story/wiki-entry/properties/chapter-number.number-property.types.ts"
import type { Chosen } from "akasha/story/world/decisions/properties/chosen.text-property.types.ts"
import type { DecisionEffect } from "akasha/story/world/decisions/properties/decision-effect.text-property.types.ts"
import type { DecisionOptions } from "akasha/story/world/decisions/properties/decision-options.text-property.types.ts"
import type { DecisionType } from "akasha/story/world/decisions/properties/decision-type.select-property.types.ts"

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
