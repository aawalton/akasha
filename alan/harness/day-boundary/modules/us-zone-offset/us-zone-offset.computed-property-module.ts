import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const usZoneOffset = {
  id: "01a05c77-31e6-7877-b124-3f103fd4ac3d",
  type: "page-type/computed-property-module",
  slug: "us-zone-offset",
  definition: "how far behind UTC New York and Denver are at one instant",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Saving time runs from the second Sunday in March to the first Sunday in November.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Saving time turns at two o'clock in the morning on the wall.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone further west therefore turns later in UTC.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Denver turns two hours after New York.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spring is read against the winter offset of the zone being asked about.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Autumn is read against the winter offset less the hour saving time added.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The rule as the rule is today is applied to every year.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "These offsets are judged against the zone database.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Denver wall time read as UTC names the instant it really is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wall time the clock skipped names no instant.",
    },
  ],
} as const satisfies ComputedPropertyModule
