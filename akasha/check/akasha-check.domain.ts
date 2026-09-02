import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaCheck = {
  id: "01a049e9-651c-7008-b4db-b19f7b063ac1",
  pageTypeSlug: "domain",
  slug: "akasha-check",
  definition: "a judgement passed on a change before it lands",
  invariants: [
    {
      invariantKind: "stopgap",
      statement:
        "No check stands only to test what the compiler tests apart from the one that runs it.",
    },
    {
      invariantKind: "gap",
      statement: "A check that only repeats the compiler does not land.",
    },
  ],
} as const satisfies Domain
