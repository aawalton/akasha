import type { Domain } from "../domains/domains/domain.page-type.ts"

export const log = {
  id: "01a0658b-0f02-79a4-861b-f04b48ab54ce",
  pageTypeSlug: "domain",
  slug: "log",
  definition: "the lines a program wrote about what it was doing",
  pluralSlug: "logs",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A log is kept for days.",
    },
  ],
} as const satisfies Domain
