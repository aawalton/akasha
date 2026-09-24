import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readsKeeping = {
  id: "01a0d4da-95ae-71bd-a4e3-35db49d47caa",
  type: "page-type/module",
  slug: "reads-keeping",
  definition: "what each computed property's calculation reads, kept beside that property's page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a calculation reads is added to what its computed property already keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding more than eight files kept is kept in place of those files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is written where what is kept would stay the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A keeping that fails is said, and the answer that read it is not refused.",
    },
  ],
} as const satisfies Module
