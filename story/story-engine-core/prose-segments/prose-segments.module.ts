import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const proseSegments = {
  id: "01a05b71-e544-7429-b3f8-5d2560f95738",
  pageTypeSlug: "module",
  slug: "prose-segments",
  definition: "prose cut into runs at the markers saying where a system card belongs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A marker is exactly the word system in double braces.",
    },
    {
      invariantKind: "departure",
      statement: "A marker stands alone in its own block.",
    },
    {
      invariantKind: "departure",
      statement: "A block reaching for a marker without being one is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Neighbouring prose blocks are gathered into one run.",
    },
  ],
} as const satisfies Module
