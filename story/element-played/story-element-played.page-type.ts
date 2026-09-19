import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyElementPlayed = {
  id: "01a06828-cb9a-765c-a42b-ad24c065bb9b",
  type: "page-type/page-type",
  slug: "story-element-played",
  definition: "one thing a story nobody wrote was played out of",
  pluralSlug: "elements",
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
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An element is a person the story follows or the place the story runs in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An element's five faculties on its page hold across the whole story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The faculties that change turn by turn sit beside the element's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An element's slug opens with the story the element was played in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An element states at every turn how the element would act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An element states a turn whether or not the story takes that turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting element's knowing is the story's true state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Another element's knowing is free to differ from the story's true state.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "No program plays an element.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An agent writes each turn by hand.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
