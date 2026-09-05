import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"
import type { WorldSlug } from "../stories-played/properties/world-slug.relation-property.ts"
import type { ChapterNumber } from "../wiki-entries/properties/chapter-number.number-property.ts"
import type { Chosen } from "./properties/chosen.text-property.ts"
import type { DecisionEffect } from "./properties/decision-effect.text-property.ts"
import type { DecisionOptions } from "./properties/decision-options.text-property.ts"
import type { DecisionType } from "./properties/decision-type.select-property.ts"

export type StoryDecision = Page & {
  title: Title
  worldSlug?: WorldSlug
  chapterNumber?: ChapterNumber
  decisionType?: DecisionType
  options?: DecisionOptions
  chosen?: Chosen
  effect?: DecisionEffect
  prose?: Prose
}

export const storyDecision = {
  id: "01a06578-d638-7072-8faf-6245b8cda4ae",
  pageTypeSlug: "page-type",
  slug: "story-decision",
  definition: "one fork a reader settled, with what the settling changed",
  pluralSlug: "story-decisions",
  extendsSlug: ["page-type/page"],
  runsTabooCheck: false,
  partSlugs: [
    "select-property/decision-type",
    "text-property/chosen",
    "text-property/decision-effect",
    "text-property/decision-options",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "world-slug", required: false, many: false },
    { pagePropertySlug: "chapter-number", required: false, many: false },
    { pagePropertySlug: "decision-type", required: false, many: false },
    { pagePropertySlug: "decision-options", required: false, many: false },
    { pagePropertySlug: "chosen", required: false, many: false },
    { pagePropertySlug: "decision-effect", required: false, many: false },
    { pagePropertySlug: "prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A decision carries every option the decision was settled between as well as the option settled on.",
    },
    {
      invariantKind: "departure",
      statement: "An option not settled on stays so the fork can be read again.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a decision changed is stated rather than worked out from the chapters after the decision.",
    },
    {
      invariantKind: "departure",
      statement: "The words a decision carries are the story's rather than akasha's own.",
    },
  ],
} as const satisfies PageType
