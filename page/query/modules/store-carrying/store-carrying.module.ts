import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const storeCarrying = {
  id: "01a0e17c-6623-7357-abdd-bb781784d366",
  type: "page-type/module",
  slug: "store-carrying",
  definition:
    "a question a browser puts to a web app, carried on to the page store and answered back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader the web app does not find signed in is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each web app hands in how it finds its reader signed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question is carried as a JSON body to the store path the caller names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store's answer is carried back unchanged.",
    },
  ],
} as const satisfies Module
