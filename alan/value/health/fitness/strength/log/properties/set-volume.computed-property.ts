import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const setVolume = {
  id: "01a077cb-d5b9-767f-8668-3cf04e5756fc",
  type: "page-type/computed-property",
  slug: "set-volume",
  propertySlug: "set-volume",
  definition: "the total pounds an exercise set moves",
  holds: "number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An exercise set is worth the load that exercise set moves once for each rep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The load an exercise set moves counts the weight once for each implement held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The load an exercise set moves counts the share of the bodyweight the exercise has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "How much of the lifter's own weight a movement carries is the movement's to state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bodyweight is read off Alan's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The movement is reached by the address the exercise set names rather than by a slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An exercise set's volume is not rounded.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A field the exercise set states nothing for counts as nought rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An exercise set is worth the load it moved, whether it warmed Alan up or worked him.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An exercise set carrying no load or counting no rep comes out at nought on the arithmetic alone.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-06T17:37:22.361Z",
  updatedAt: "2026-10-30T17:22:27.006Z",
} as const satisfies ComputedProperty
