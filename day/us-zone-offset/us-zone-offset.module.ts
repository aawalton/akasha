import type { Module } from "../../code-system/modules/module.page-type.ts"

export const usZoneOffset = {
  id: "01a05c77-31e6-7877-b124-3f103fd4ac3d",
  pageTypeSlug: "module",
  slug: "us-zone-offset",
  definition: "how far behind UTC New York and Denver stand at one instant",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Saving time runs from the second Sunday in March to the first Sunday in November.",
    },
    {
      invariantKind: "departure",
      statement: "Saving time turns at two o'clock in the morning on the wall.",
    },
    {
      invariantKind: "departure",
      statement: "A zone further west therefore turns later in UTC.",
    },
    {
      invariantKind: "departure",
      statement: "Denver turns two hours after New York.",
    },
    {
      invariantKind: "departure",
      statement: "Spring is read against the winter offset of the zone being asked about.",
    },
    {
      invariantKind: "departure",
      statement: "Autumn is read against the winter offset less the hour saving time added.",
    },
    {
      invariantKind: "constraint",
      statement: "The rule standing today is applied to every year.",
    },
    {
      invariantKind: "departure",
      statement: "The zone database is what these offsets are judged against.",
    },
  ],
} as const satisfies Module
