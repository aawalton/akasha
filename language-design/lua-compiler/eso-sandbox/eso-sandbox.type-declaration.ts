import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const esoSandbox = {
  id: "01a06c82-21b5-74b7-9f92-ab9f244c6e82",
  pageTypeSlug: "type-declaration",
  slug: "eso-sandbox",
  definition: "the Lua standard library the game's sandbox leaves in reach",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The compiler's own runtime library is compiled against the names declared here.",
    },
    {
      invariantKind: "gap",
      statement: "The names the game adds to Lua are apart from the names Lua itself carries.",
    },
  ],
} as const satisfies TypeDeclaration
