import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const evalEnv = {
  id: "01a06137-f96b-7cf5-abc2-4f59c9d2db9a",
  pageTypeSlug: "module",
  slug: "eval-env",
  definition: "the lookups a rule evaluation needs from outside the item's own facts",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every lookup may answer unknown in place of a value.",
    },
    {
      invariantKind: "absence",
      statement: "No lookup declared here is asynchronous.",
    },
    {
      invariantKind: "departure",
      statement:
        "The evaluation context carries the claim map and the stock groups beside the environment.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A wanted-equipment lookup takes equipType and traitType and quality as one bundle.",
    },
  ],
} as const satisfies Module
