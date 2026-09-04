import type { Module } from "../../code-system/modules/module.page-type.ts"

export const randomId = {
  id: "01a05c48-deeb-7012-98c6-5d13910416a7",
  pageTypeSlug: "module",
  slug: "random-id",
  definition: "the runtime's random uuid, taken as a string",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No page takes its identity from here.",
    },
    {
      invariantKind: "departure",
      statement: "A value from here is unpredictable rather than ordered by time.",
    },
  ],
} as const satisfies Module
