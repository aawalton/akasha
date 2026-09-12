import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const strengthExerciseSelectionConstraint = {
  id: "01a09321-570f-755f-bc16-c8ba7c719e26",
  type: "page-type",
  slug: "strength-exercise-selection-constraint",
  definition: "a rule saying which movements Alan may not be offered",
  pluralSlug: "strength-exercise-selection-constraints",
  extends: ["page-type/module"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A constraint answers whether one exercise page is left in.",
    },
    {
      invariantKind: "departure",
      statement: "A constraint states when that constraint is tested again.",
    },
  ],
  types: "ts",
  properties: [
    { pageProperty: "calendar-date-property/tested-again-on", required: true, many: false },
  ],
  parts: [
    "calendar-date-property/tested-again-on",
    "strength-exercise-selection-constraint/bilateral-hinge",
  ],
} as const satisfies PageType
