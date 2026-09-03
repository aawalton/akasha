import type { Module } from "@akasha/code-system/module"

export const inventoryRuleFlags = {
  id: "01a068e2-2269-7419-86a9-56b04e4d4e87",
  pageTypeSlug: "module",
  slug: "inventory-rule-flags",
  definition: "what a rule flag said on the command line has to be to be taken",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value a flag cannot take is refused as input rather than carried on.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the flag, what was said, and what it takes.",
    },
    {
      invariantKind: "departure",
      statement: "The actions a rule may take are the ones the rules package declares.",
    },
    {
      invariantKind: "departure",
      statement: "A condition and a destination chain arrive as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "JSON that does not parse and JSON of the wrong shape are refused apart.",
    },
  ],
} as const satisfies Module
