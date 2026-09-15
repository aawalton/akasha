import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const porcelainStatus = {
  id: "01a06816-2f10-7f63-bec8-aabc4cd78c0b",
  type: "module",
  slug: "porcelain-status",
  definition: "the machine-readable status git prints, and the entries read out of it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The arguments the status is asked for with are spelled here once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One record is separated from the next by a NUL byte rather than by a newline.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record is two status columns and a space and the path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rename or a copy has the path that record came from in the record following that record.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record of any other shape is answered as an error rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text trimmed or reflowed loses the first record's leading column and is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs git.",
    },
  ],
} as const satisfies Module
