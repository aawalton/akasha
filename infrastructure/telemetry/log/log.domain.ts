import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const log = {
  id: "01a0658b-0f02-79a4-861b-f04b48ab54ce",
  type: "domain",
  slug: "log",
  definition: "the lines a program wrote about what it was doing",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A log is kept for days.",
    },
  ],
} as const satisfies Domain
