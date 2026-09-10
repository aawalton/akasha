import type { PageType } from "@akasha/pages/page-type"

export const storyElementPlayed = {
  id: "01a06828-cb9a-765c-a42b-ad24c065bb9b",
  pageTypeSlug: "page-type",
  type: "page-type",
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
    { pageProperty: "relation-property/played-story", required: true, many: false },
    { pageProperty: "select-property/element-kind", required: true, many: false },
    { pageProperty: "text-property/perceiving", required: true, many: false },
    { pageProperty: "text-property/knowing", required: true, many: false },
    { pageProperty: "text-property/feeling", required: true, many: false },
    { pageProperty: "text-property/wanting", required: true, many: false },
    { pageProperty: "text-property/doing", required: true, many: false },
    { pageProperty: "file-property/turn-states", required: false, many: false },
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
  types: "ts",
} as const satisfies PageType
