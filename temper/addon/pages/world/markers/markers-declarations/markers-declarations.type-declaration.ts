import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const markersDeclarations = {
  id: "01a0de85-2b4a-7c04-aa82-861ffb31c1e7",
  type: "page-type/type-declaration",
  slug: "markers-declarations",
  definition: "the marker windows' controls and the table their markup and key bindings call",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every control named here is declared by the markup rather than by any code.",
    },
  ],
} as const satisfies TypeDeclaration
