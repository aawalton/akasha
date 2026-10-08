import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const typescriptInternals = {
  id: "01a0691f-4de6-73ec-ad84-6ee006f2e3f7",
  type: "page-type/type-declaration",
  slug: "typescript-internals",
  definition: "the compiler's own unexported names the Lua compiler reaches",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each name here is a name the compiler ships without declaring.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A program's options are read as the Lua compiler's options.",
    },
  ],
  createdAt: "2026-09-03T21:14:14.374Z",
  updatedAt: "2026-09-22T13:55:14.000Z",
} as const satisfies TypeDeclaration
