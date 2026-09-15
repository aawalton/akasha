import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const usZoneOffset = {
  id: "01a05c77-31e6-7877-b124-3f103fd4ac3d",
  type: "page-type/module",
  slug: "us-zone-offset",
  definition: "how far behind UTC New York and Denver are at one instant",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Saving time runs from the second Sunday in March to the first Sunday in November.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Saving time turns at two o'clock in the morning on the wall.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A zone further west therefore turns later in UTC.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Denver turns two hours after New York.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Spring is read against the winter offset of the zone being asked about.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Autumn is read against the winter offset less the hour saving time added.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The rule as the rule is today is applied to every year.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "These offsets are judged against the zone database.",
    },
  ],
} as const satisfies Module
