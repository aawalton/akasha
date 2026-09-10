import type { TypeDeclaration } from "akasha/code-system/type-declarations/type-declaration.page-type.types.ts"

export const typescriptInternals = {
  id: "01a0691f-4de6-73ec-ad84-6ee006f2e3f7",
  pageTypeSlug: "type-declaration",
  type: "type-declaration",
  slug: "typescript-internals",
  definition: "the compiler's own unexported names the Lua compiler reaches into",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each name here is a name the compiler ships without declaring.",
    },
    {
      invariantKind: "departure",
      statement: "A program's options are read as the Lua compiler's options.",
    },
  ],
} as const satisfies TypeDeclaration
