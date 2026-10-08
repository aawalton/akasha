import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const esoSandbox = {
  id: "01a06c82-21b5-74b7-9f92-ab9f244c6e82",
  type: "page-type/type-declaration",
  slug: "eso-sandbox",
  definition: "the Lua standard library the game's sandbox leaves in reach",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The compiler's own runtime library is compiled against the names declared here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The names the game adds to Lua are declared on `eso-sandbox-additions`.",
    },
  ],
  createdAt: "2026-09-04T13:01:02.773Z",
  updatedAt: "2026-09-24T22:45:37.000Z",
} as const satisfies TypeDeclaration
