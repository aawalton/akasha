import type { Module } from "@akasha/code-system/module"

export const inventoryDiagnosticsReading = {
  id: "01a06864-aa2b-7000-8543-ad1be36860ed",
  pageTypeSlug: "module",
  slug: "inventory-diagnostics-reading",
  definition:
    "one diagnostic the inventory addon left in its saved variables, found by walking the accounts",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The account the diagnostic sits under is found by walking rather than named by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "The first account carrying the diagnostic answers and the rest go unread.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that is absent, unreadable or missing its Default table is refused as data.",
    },
    {
      invariantKind: "departure",
      statement: "A caller rules on one account's own table rather than on the whole file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The refusal names what was looked for and what the reader should do to make it exist.",
    },
  ],
} as const satisfies Module
