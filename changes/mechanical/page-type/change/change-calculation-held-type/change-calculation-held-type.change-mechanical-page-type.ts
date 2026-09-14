import type { ChangeMechanicalPageType } from "akasha/changes/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const changeCalculationHeldType = {
  id: "01a09c8d-ef19-7434-8f64-db9ac5dcf0e2",
  type: "change-mechanical-page-type",
  slug: "change-calculation-held-type",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "every calculation naming its own property's type rather than restating that kind",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every calculation is answered in this one answer.",
    },
    {
      invariantKind: "departure",
      statement: "The pages acted on are every page property a function works out.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose type is written by nothing is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation already naming that type is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The type named is the one written beside the property.",
    },
    {
      invariantKind: "departure",
      statement: "The page the calculation takes is left as the calculation names it.",
    },
    {
      invariantKind: "departure",
      statement: "The type is named beside whatever else the calculation takes that shape from.",
    },
    {
      invariantKind: "departure",
      statement: "A code file exporting no such calculation is refused rather than passed over.",
    },
    {
      invariantKind: "constraint",
      statement: "A slug making no type name refuses the change before any code is composed.",
    },
    {
      invariantKind: "departure",
      statement: "The path the type is imported from is written as the source spells a string.",
    },
    {
      invariantKind: "departure",
      statement: "A run every calculation of which names that type already is refused as no edit.",
    },
    {
      invariantKind: "departure",
      statement: "One page's code is changed by two edits over the one body.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole change, and the refusal names that page.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named holds the change to the pages sitting under that folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what kind a property states.",
    },
    {
      invariantKind: "absence",
      statement: "No rung beneath is reached.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
