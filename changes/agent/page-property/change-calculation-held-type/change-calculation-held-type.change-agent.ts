import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const changeCalculationHeldType = {
  id: "01a08e63-dd13-7d9c-b2c7-ac4d653ee737",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "change-calculation-held-type",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/page-type",
  definition: "every calculation naming its own property's type rather than restating that kind",
  code: "ts",
  test: "ts",
  invariants: [
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
      invariantKind: "departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page that drew the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Each page is reached over the edits the pages before it left.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named holds the change to the pages sitting under that folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what kind a property states.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
