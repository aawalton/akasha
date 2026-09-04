import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchClient = {
  id: "01a06863-264d-79d8-8aef-9cdb6f51a8ba",
  pageTypeSlug: "module",
  slug: "monarch-client",
  definition: "Monarch's own GraphQL API, read into the shapes this harness names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every reply is read into a named shape rather than passed on as Monarch sent it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reply carrying a GraphQL error is refused with what it said, however the status read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A request that has not answered in thirty seconds is abandoned rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement:
        "Transactions are drawn a page of five hundred at a time until a page comes back short.",
    },
    {
      invariantKind: "departure",
      statement:
        "An update stamp is asked for on its own, so a minute where nothing moved costs one call.",
    },
    {
      invariantKind: "departure",
      statement:
        "The credential is handed in rather than read here, so what authenticates is one module's business.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to Monarch.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
