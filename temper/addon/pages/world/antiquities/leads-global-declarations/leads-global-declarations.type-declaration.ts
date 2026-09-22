import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const leadsGlobalDeclarations = {
  id: "01a06274-b08b-7d77-84f1-e4cc639b4458",
  type: "page-type/type-declaration",
  slug: "leads-global-declarations",
  definition: "the shape of the table the lead window's markup calls",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A key here is spelled as the markup that calls the key spells the key.",
    },
  ],
} as const satisfies TypeDeclaration
