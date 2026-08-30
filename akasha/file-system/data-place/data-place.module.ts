import type { Module } from "../../code-system/module/module.page-type.ts"

export const dataPlace = {
  id: "01a05361-09df-7452-a3cc-9443498c1d89",
  pageTypeSlug: "module",
  slug: "data-place",
  definition: "where akasha keeps what it works out, under the folder git does not track",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The place is said here alone. What stands under it is named by whatever owns that, so a subtree is spelled once and the place it stands in is spelled nowhere else.",
    },
    {
      invariantKind: "departure",
      statement:
        "The place is answered both under a root and on its own, because a guard settles it against a root and a refusal names it as text.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here reads or writes. Where the place stands is an answer, and whether anything stands there is asked of the disk by whoever asks.",
    },
    {
      invariantKind: "absence",
      statement:
        "What the place holds is not said here. The index, the read record and a test's seeded warrants each name their own, and none of them is known here.",
    },
  ],
} as const satisfies Module
