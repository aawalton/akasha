import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const projectHours = {
  id: "01a079c7-08a2-7126-a95c-29853fc8e604",
  type: "page-type/computed-property",
  slug: "project-hours",
  propertySlug: "project-hours",
  definition: "the hours of a day's tracked sessions of Projects",
  holds: "number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tracked session counts where the tracked session's title says projects as a word of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracked session still open counts up to the moment the reading is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no tracked sessions is no reading rather than a spend of nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-07T02:51:22.146Z",
  updatedAt: "2026-10-30T17:46:53.805Z",
} as const satisfies ComputedProperty
