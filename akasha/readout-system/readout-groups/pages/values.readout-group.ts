import type { ReadoutGroup } from "../readout-group.page-type.ts"

export const values = {
  id: "01a06297-07b1-7da2-9e76-0d8a293edd9b",
  pageTypeSlug: "readout-group",
  slug: "values",
  definition: "how well a day served each of the things that matter to Alan",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This group is the count a day's points are weighed against as well as a display.",
    },
    {
      invariantKind: "departure",
      statement: "Every member of this group is read against one scale.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A group here resolving to fewer members than the group holds makes the points larger.",
    },
  ],
} as const satisfies ReadoutGroup
