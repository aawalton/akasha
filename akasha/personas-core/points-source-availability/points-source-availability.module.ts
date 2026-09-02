import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pointsSourceAvailability = {
  id: "01a05b70-a58c-7bba-b4c0-2402fda0261b",
  pageTypeSlug: "module",
  slug: "points-source-availability",
  definition: "whether a persona's points may be written given the source she declares",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A persona declaring her source unavailable has her stored total left as that total stands.",
    },
    {
      invariantKind: "absence",
      statement: "No substitute is metered in place of a source that is not there.",
    },
  ],
} as const satisfies Module
