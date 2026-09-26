import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipeListCatalog = {
  id: "01a0de64-3221-7e2b-adc2-af65388f483f",
  type: "page-type/module",
  slug: "recipe-list-catalog",
  definition:
    "every crafting recipe the recipe list pages hold, kept for a reader that cannot wait",
  code: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A list's place is the display order its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe's place in its list is the place its row has in the page's recipes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name more than one recipe carries answers with the last of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Asking for the catalogue before it is read is refused rather than answered empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads a file, so a browser, a server and the addon read it alike.",
    },
  ],
} as const satisfies Module
