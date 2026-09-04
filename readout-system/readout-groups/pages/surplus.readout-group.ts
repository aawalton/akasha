import type { ReadoutGroup } from "../readout-group.page-type.ts"

export const surplus = {
  id: "01a05fc3-145a-74b9-bd54-23090ceb85d8",
  pageTypeSlug: "readout-group",
  slug: "surplus",
  definition: "how much of Alan's night the day has left him",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading is what the night held less what the day spent.",
    },
  ],
} as const satisfies ReadoutGroup
