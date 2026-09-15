import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keyRequiring = {
  id: "01a0825b-21cd-7c17-ac5f-ecb7da01c1e7",
  type: "page-type/module",
  slug: "key-requiring",
  definition: "whether the page type a page is requires a key",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type a page's file name states says whether a key is required.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That page type is read through the world's index rather than off disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path naming no page is answered as neither required nor not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file beside a page rather than the page is answered as neither required nor not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type the index answers nothing for is answered as neither required nor not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page type declares no property under is not required.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page type declares as not required is not required.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page type declares as required is required.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the page's body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rewrites a body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges the meaning a required key has for an edit.",
    },
  ],
} as const satisfies Module
