import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ttcListingSchema = {
  id: "01a0609b-e59e-7b1a-960c-fe4f807c30e4",
  pageTypeSlug: "module",
  slug: "ttc-listing-schema",
  definition: "what a Tamriel Trade Centre listing must carry before a reader believes it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A listing missing a field the parse requires is dropped rather than repaired.",
    },
    {
      invariantKind: "departure",
      statement: "A field the parse does not name is carried through untouched.",
    },
    {
      invariantKind: "departure",
      statement: "A garbled page count is read as the first page.",
    },
  ],
} as const satisfies Module
