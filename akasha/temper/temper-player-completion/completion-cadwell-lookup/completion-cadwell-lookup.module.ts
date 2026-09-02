import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCadwellLookup = {
  id: "01a06358-4f7c-7d6d-8881-1e898924e3ff",
  pageTypeSlug: "module",
  slug: "completion-cadwell-lookup",
  definition: "which stop of Cadwell's Almanac a character has finished",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The Cadwell catalog arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "departure",
      statement: "A stop is matched by its zone name and its own name taken together.",
    },
    {
      invariantKind: "departure",
      statement: "A level's tier number is the display order its page states.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty item path answers every stop of the catalog.",
    },
    {
      invariantKind: "constraint",
      statement: "An item path holding something other than a number answers nothing.",
    },
  ],
} as const satisfies Module
