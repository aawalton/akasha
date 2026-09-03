import type { Module } from "@akasha/code-system/module"

export const porcelainStatus = {
  id: "01a06816-2f10-7f63-bec8-aabc4cd78c0b",
  pageTypeSlug: "module",
  slug: "porcelain-status",
  definition: "the machine-readable status git prints, and the entries read out of it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The arguments the status is asked for with are spelled here once.",
    },
    {
      invariantKind: "departure",
      statement: "One record is separated from the next by a NUL byte rather than by a newline.",
    },
    {
      invariantKind: "departure",
      statement: "A record is two status columns, a space, and the path.",
    },
    {
      invariantKind: "departure",
      statement: "A rename or a copy carries the path it came from in the record following it.",
    },
    {
      invariantKind: "departure",
      statement: "A record of any other shape is answered as an error rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Text trimmed or reflowed loses the first record's leading column and is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs git.",
    },
  ],
} as const satisfies Module
