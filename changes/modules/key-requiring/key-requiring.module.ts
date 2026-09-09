import type { Module } from "@akasha/code/module"

export const keyRequiring = {
  id: "01a0825b-21cd-7c17-ac5f-ecb7da01c1e7",
  pageTypeSlug: "module",
  type: "module",
  slug: "key-requiring",
  definition: "whether the type a page's literal satisfies requires a key",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The type a page's literal satisfies is what says whether a key is required.",
    },
    {
      invariantKind: "departure",
      statement: "The type is read over the bodies the world has rather than the bodies on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A page with no literal is answered as neither required nor not.",
    },
    {
      invariantKind: "departure",
      statement:
        "A contextual type read as `any` or `unknown` is answered as neither required nor not.",
    },
    {
      invariantKind: "departure",
      statement: "A key the type states no property under is not required.",
    },
    {
      invariantKind: "departure",
      statement: "A key the type marks optional is not required.",
    },
    {
      invariantKind: "departure",
      statement: "A key the type marks neither absent nor optional is required.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rewrites a body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what a required key means for an edit.",
    },
  ],
} as const satisfies Module
