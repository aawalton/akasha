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
      statement: "A stretch counts where the stretch's title says projects as a word of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch still open counts up to the moment the reading is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no stretches is no reading rather than a spend of nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-07T02:51:22.146Z",
  updatedAt: "2026-10-30T17:05:29.624Z",
} as const satisfies ComputedProperty
