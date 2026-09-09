import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Doing } from "./properties/doing.text-property.ts"
import type { ElementKind } from "./properties/element-kind.select-property.ts"
import type { Feeling } from "./properties/feeling.text-property.ts"
import type { Knowing } from "./properties/knowing.text-property.ts"
import type { Perceiving } from "./properties/perceiving.text-property.ts"
import type { PlayedStory } from "./properties/played-story.relation-property.ts"
import type { TurnStates } from "./properties/turn-states.file-property.ts"
import type { Wanting } from "./properties/wanting.text-property.ts"

export type StoryElementPlayed = Page & {
  playedStory: PlayedStory
  elementKind: ElementKind
  perceiving: Perceiving
  knowing: Knowing
  feeling: Feeling
  wanting: Wanting
  doing: Doing
  turnStates?: TurnStates
}

export const storyElementPlayed = {
  id: "01a06828-cb9a-765c-a42b-ad24c065bb9b",
  pageTypeSlug: "page-type",
  slug: "story-element-played",
  definition: "one thing a story nobody wrote was played out of",
  pluralSlug: "story-elements-played",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "file-property/turn-states",
    "relation-property/played-story",
    "select-property/element-kind",
    "text-property/doing",
    "text-property/feeling",
    "text-property/knowing",
    "text-property/perceiving",
    "text-property/wanting",
  ],
  properties: [
    { pagePropertySlug: "relation-property/played-story", required: true, many: false },
    { pagePropertySlug: "select-property/element-kind", required: true, many: false },
    { pagePropertySlug: "text-property/perceiving", required: true, many: false },
    { pagePropertySlug: "text-property/knowing", required: true, many: false },
    { pagePropertySlug: "text-property/feeling", required: true, many: false },
    { pagePropertySlug: "text-property/wanting", required: true, many: false },
    { pagePropertySlug: "text-property/doing", required: true, many: false },
    { pagePropertySlug: "file-property/turn-states", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An element is a person the story follows or the place the story runs in.",
    },
    {
      invariantKind: "departure",
      statement: "An element's five faculties on its page hold across the whole story.",
    },
    {
      invariantKind: "departure",
      statement: "The faculties that change turn by turn sit beside the element's page.",
    },
    {
      invariantKind: "departure",
      statement: "An element's slug opens with the story the element was played in.",
    },
    {
      invariantKind: "departure",
      statement: "An element states at every turn how the element would act.",
    },
    {
      invariantKind: "departure",
      statement: "An element states a turn whether or not the story takes that turn.",
    },
    {
      invariantKind: "departure",
      statement: "A setting element's knowing is the story's true state.",
    },
    {
      invariantKind: "departure",
      statement: "Another element's knowing is free to differ from the story's true state.",
    },
    {
      invariantKind: "gap",
      statement: "No program plays an element.",
    },
    {
      invariantKind: "gap",
      statement: "An agent writes each turn by hand.",
    },
  ],
} as const satisfies PageType
