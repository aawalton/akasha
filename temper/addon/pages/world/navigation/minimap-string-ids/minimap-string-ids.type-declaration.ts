import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const minimapStringIds = {
  id: "01a06269-2b15-7ed4-828d-87a96fe2a139",
  type: "page-type/type-declaration",
  slug: "minimap-string-ids",
  definition: "the string ids the minimap makes for its settings and key bindings",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A string id here is made at load rather than shipped with the game.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.613Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies TypeDeclaration
