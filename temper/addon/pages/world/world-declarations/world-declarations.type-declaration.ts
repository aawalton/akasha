import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const worldDeclarations = {
  id: "01a0c6ca-ff95-747e-8c27-666b07ade6ff",
  type: "page-type/type-declaration",
  slug: "world-declarations",
  definition: "the table this add-on publishes under its own name",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is declared by the members the key bindings reach.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
  createdAt: "2026-09-22T01:46:27.605Z",
  updatedAt: "2026-09-22T01:49:45.000Z",
} as const satisfies TypeDeclaration
