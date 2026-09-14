import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const changeCalculationHeldType = {
  id: "01a08e63-dd13-7d9c-b2c7-ac4d653ee737",
  type: "change-agent",
  slug: "change-calculation-held-type",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
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
      statement: "A folder named holds the change to the pages sitting under that folder.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal over a page names that page.",
    },
    {
      invariantKind: "departure",
      statement: "The edits are worked out by the change reached.",
    },
    {
      invariantKind: "departure",
      statement: "That change acts on a page type, as this one does.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page's own body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-checked",
  maxCpuSeconds: 120,
} as const satisfies ChangeAgent
