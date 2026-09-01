import type { ChangeKind } from "../change-kind.page-type.ts"

export const changeAuthored = {
  id: "01a05df1-e262-7648-bbe1-061d37bd706d",
  pageTypeSlug: "change-kind",
  slug: "change-authored",
  definition: "a change an agent composes",
  runsChecks: true,
  runsWarrants: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change made by an akasha command stating `mechanical` false is authored.",
    },
  ],
} as const satisfies ChangeKind
