import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type SetVolume = number

export const setVolume = {
  id: "01a077cb-d5b9-767f-8668-3cf04e5756fc",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "set-volume",
  propertySlug: "set-volume",
  definition: "the weight one set of work moved, in pounds",
  holds: "number",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A set is worth the load that set moves once for each rep.",
    },
    {
      invariantKind: "departure",
      statement: "The load a set moves counts the weight once for each implement held.",
    },
    {
      invariantKind: "departure",
      statement: "The load a set moves counts the share of the bodyweight the exercise has.",
    },
    {
      invariantKind: "departure",
      statement:
        "How much of the lifter's own weight a movement carries is the movement's to state.",
    },
    {
      invariantKind: "departure",
      statement: "The bodyweight is read off Alan's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A warmup set is worth nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A set stating an activity is worth nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A set stating no activity is strength.",
    },
    {
      invariantKind: "departure",
      statement: "A set's volume is not rounded.",
    },
    {
      invariantKind: "stopgap",
      statement: "A field the set states nothing for counts as nought rather than refusing.",
    },
  ],
} as const satisfies ComputedProperty
