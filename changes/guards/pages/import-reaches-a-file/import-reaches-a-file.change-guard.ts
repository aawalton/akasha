import type { ChangeGuard } from "../../change-guard.page-type.ts"

export const importReachesAFile = {
  id: "01a07969-9122-7db9-ad3c-de58ab103a06",
  pageTypeSlug: "change-guard",
  slug: "import-reaches-a-file",
  definition: "the guard refusing an answer whose written code names an import reaching no file",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The imports judged are read from the body the answer writes.",
    },
    {
      invariantKind: "departure",
      statement: "A path the answer writes a body at holds a body.",
    },
    {
      invariantKind: "departure",
      statement: "A path the answer moves away from holds no body.",
    },
    {
      invariantKind: "departure",
      statement: "A path no edit names holds the body the world before the change holds.",
    },
    {
      invariantKind: "departure",
      statement: "An import reaching no file refuses the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier naming a package is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A body under no TypeScript name is judged by nothing here.",
    },
  ],
} as const satisfies ChangeGuard
