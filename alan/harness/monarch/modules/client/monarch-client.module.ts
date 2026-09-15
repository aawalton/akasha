import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchClient = {
  id: "01a06863-264d-79d8-8aef-9cdb6f51a8ba",
  type: "page-type/module",
  slug: "monarch-client",
  definition: "Monarch's own GraphQL API, read into the shapes this harness names",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every reply is read into a named shape rather than passed on as Monarch sent that reply.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A reply with a GraphQL error is refused with that error's words whatever the status read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A request that has not answered in thirty seconds is abandoned rather than waited on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A status Monarch owns the fault for is asked again, twice, each wait longer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The thirty seconds cover every try rather than each try on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A status the caller owns the fault for is refused rather than asked again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Transactions are drawn a page of five hundred at a time until a page comes back short.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An update stamp is asked for on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A minute where nothing moved costs one call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The credential is handed in rather than read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The credential is one module's business.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to Monarch.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
