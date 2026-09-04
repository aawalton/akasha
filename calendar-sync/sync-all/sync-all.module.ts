import type { Module } from "../../code-system/modules/module.page-type.ts"

export const syncAll = {
  id: "01a05c22-7bc9-7006-985e-54e556c36da8",
  pageTypeSlug: "module",
  slug: "sync-all",
  definition: "every enabled calendar source synced, and what each one's state becomes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source carries on its own page what its last sync came to.",
    },
    {
      invariantKind: "departure",
      statement: "A source missing any of what it is reached by is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A source that fails does not stop the sources after that source.",
    },
    {
      invariantKind: "departure",
      statement: "A sync where any source failed fails once every source has been tried.",
    },
    {
      invariantKind: "departure",
      statement: "A named source that matches nothing is an error rather than an empty run.",
    },
  ],
} as const satisfies Module
