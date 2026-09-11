import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const servicePuttingUp = {
  id: "01a08cef-2ffd-70db-abdd-5cf7f3cfaf21",
  type: "module",
  slug: "service-putting-up",
  definition: "every workstation service's units written from one pinned tree and asked of systemd",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every workstation service is put up at once rather than one service at a time.",
    },
    {
      invariantKind: "departure",
      statement:
        "The code a unit runs is spelled under the tree the deploy pinned rather than under the checkout.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages a unit reads and writes are read under the main checkout rather than under that tree.",
    },
    {
      invariantKind: "departure",
      statement: "A unit akasha owns that no service accounts for is taken away by this call.",
    },
    {
      invariantKind: "departure",
      statement: "A home directory nothing states refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run reports the plan the run would carry out and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A systemctl that refuses makes the call refuse.",
    },
    {
      invariantKind: "absence",
      statement:
        "A service is restarted where a file its own closure holds changed since the last deploy.",
    },
    {
      invariantKind: "absence",
      statement:
        "A scheduled service is restarted by nothing, since its next tick reads the tree as the tree is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the command line.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the cluster.",
    },
  ],
} as const satisfies Module
