import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const typescriptInternals = {
  id: "01a0691f-4de6-73ec-ad84-6ee006f2e3f7",
  type: "type-declaration",
  slug: "typescript-internals",
  definition: "the compiler's own unexported names the Lua compiler reaches into",
  d: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each name here is a name the compiler ships without declaring.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A program's options are read as the Lua compiler's options.",
    },
  ],
} as const satisfies TypeDeclaration
