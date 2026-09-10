import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"
import type { ChapterNumber } from "../wiki-entries/properties/chapter-number.number-property.ts"
import type { Chosen } from "./properties/chosen.text-property.ts"
import type { DecisionEffect } from "./properties/decision-effect.text-property.ts"
import type { DecisionOptions } from "./properties/decision-options.text-property.ts"
import type { DecisionType } from "./properties/decision-type.select-property.ts"

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
