import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const servicePuttingUp = {
  id: "01a08cef-2ffd-70db-abdd-5cf7f3cfaf21",
  type: "module",
  slug: "service-putting-up",
  definition: "every workstation service's units written from one pinned tree and asked of systemd",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every workstation service is put up at once rather than one service at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The code a unit runs is spelled under the tree the deploy pinned rather than under the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages a unit reads and writes are read under the main checkout rather than under that tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unit akasha owns that no service accounts for is taken away by this call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A home directory nothing states refuses the call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The loader and one manifest for each service are written where the units are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest carries the closure the deploy read for that service.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The port the loader reaches is the one the pages service's own page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dry run reports the plan the run would carry out and writes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A systemctl that refuses makes the call refuse.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A service is restarted where a file its own closure holds changed since the last deploy.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A scheduled service is restarted by nothing, since its next tick reads the tree as the tree is.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the command line.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the cluster.",
    },
  ],
} as const satisfies Module
