import type { TypeDeclaration } from "@akasha/code/type-declaration"

export const languageExtensions = {
  id: "01a06c82-21b6-738d-ad4f-7882e176e880",
  pageTypeSlug: "type-declaration",
  type: "type-declaration",
  slug: "language-extensions",
  definition: "the extensions the Lua compiler adds to TypeScript",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each name here is a name the compiler gives a meaning of its own at a call site.",
    },
  ],
} as const satisfies TypeDeclaration
