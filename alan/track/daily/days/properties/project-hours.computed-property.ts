import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type ProjectHours = number

export const projectHours = {
  id: "01a079c7-08a2-7126-a95c-29853fc8e604",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "project-hours",
  propertySlug: "project-hours",
  definition: "the hours Alan spent on projects, added up from the day's own stretches",
  holds: "number",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stretch counts where the stretch's title says projects as a word of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch still open counts up to the moment the reading is taken.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no stretches is no reading rather than a spend of nothing.",
    },
  ],
} as const satisfies ComputedProperty
