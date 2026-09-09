import type { ComputedPropertyModule } from "@akasha/pages/computed-property-module"

export const hoursBetween = {
  id: "01a0821f-8bbc-7772-a9fa-052b5f4ffb2b",
  pageTypeSlug: "computed-property-module",
  type: "computed-property-module",
  slug: "hours-between",
  definition: "the hours from one instant to another",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The hours are the same whichever instant is handed in first.",
    },
    {
      invariantKind: "departure",
      statement: "An end that is no readable instant is no reading rather than zero.",
    },
  ],
} as const satisfies ComputedPropertyModule
