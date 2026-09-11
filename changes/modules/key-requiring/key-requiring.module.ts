import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const keyRequiring = {
  id: "01a0825b-21cd-7c17-ac5f-ecb7da01c1e7",
  pageTypeSlug: "module",
  type: "module",
  slug: "key-requiring",
  definition: "whether the page type a page is requires a key",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page type a page's file name states says whether a key is required.",
    },
    {
      invariantKind: "departure",
      statement: "That page type is read through the world's index rather than off disk.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no page is answered as neither required nor not.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file beside a page rather than the page is answered as neither required nor not.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type the index answers nothing for is answered as neither required nor not.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page type declares no property under is not required.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page type declares as not required is not required.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page type declares as required is required.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the page's body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rewrites a body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the meaning a required key has for an edit.",
    },
  ],
} as const satisfies Module
