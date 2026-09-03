import type { Module } from "@akasha/code-system/module"

export const inventoryEvalEnv = {
  id: "01a068e2-226d-7781-8c70-c328fa164cff",
  pageTypeSlug: "module",
  slug: "inventory-eval-env",
  definition: "what a rule walk off the game can answer about a character and what it cannot",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What only the running game knows is answered unknown rather than guessed.",
    },
    {
      invariantKind: "departure",
      statement: "A character knows a recipe, a motif or a script and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A motif with no chapter named is known where every chapter of it is known.",
    },
    {
      invariantKind: "departure",
      statement: "A style the chapter table has never heard of is known by nobody.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here talks to the game.",
    },
  ],
} as const satisfies Module
