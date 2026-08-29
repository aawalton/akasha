import type { Module } from "../../code-system/module/module.page-type.ts"

export const generatedProperties = {
  id: "01a04f2b-3d23-790e-b2f2-a9b1e6846e6f",
  pageTypeSlug: "module",
  slug: "generated-properties",
  definition: "which page properties state a generator, read from the pages the index names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which properties are generated is read from the pages the index names, never from a list written in code.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property is generated when it states a generator, so a third one is answered here with no code changed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages are reached through the index and loaded off the disk, so a property taking a generator and the first page leaning on it do not land together.",
    },
    {
      invariantKind: "departure",
      statement: "The slugs come back in one order, so what is built from them does not shift.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here works a value out or fills one in. This says only which properties are filled for the writer.",
    },
  ],
} as const satisfies Module
