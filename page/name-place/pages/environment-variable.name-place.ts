import type { NamePlace } from "akasha/page/name-place/name-place.page-type.types.ts"

export const environmentVariable = {
  id: "01a04fed-2fc0-7d40-b4e0-e630cdde2957",
  type: "page-type/name-place",
  slug: "environment-variable",
  definition: "the name of a value handed to a process from outside",
  nameFormat: "name-format/upper-snake-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value handed in from outside remains fixed for the whole of a run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name akasha reads opens with the name of the system that set that name.",
    },
  ],
} as const satisfies NamePlace
