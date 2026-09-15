import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const setVolume = {
  id: "01a077cb-d5b9-767f-8668-3cf04e5756fc",
  type: "computed-property",
  slug: "set-volume",
  propertySlug: "set-volume",
  definition: "the weight one set of work moved, in pounds",
  holds: "number",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A set is worth the load that set moves once for each rep.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The load a set moves counts the weight once for each implement held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The load a set moves counts the share of the bodyweight the exercise has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "How much of the lifter's own weight a movement carries is the movement's to state.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bodyweight is read off Alan's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The movement is reached by the address the set names rather than by a slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A warmup set is worth nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A set stating an activity is worth nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A set stating no activity is strength.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A set's volume is not rounded.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "A field the set states nothing for counts as nought rather than refusing.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
