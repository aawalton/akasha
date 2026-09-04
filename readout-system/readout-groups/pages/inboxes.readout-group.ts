import type { ReadoutGroup } from "../readout-group.page-type.ts"

export const inboxes = {
  id: "01a06230-b155-7b8c-9044-28e5319d83e7",
  pageTypeSlug: "readout-group",
  slug: "inboxes",
  definition: "how far each of Alan's inboxes is from empty",
  sortOrder: "place",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A daily inbox of a hundred or more is black rather than a reading gone missing.",
    },
    {
      invariantKind: "departure",
      statement: "An inbox at empty is blue.",
    },
    {
      invariantKind: "departure",
      statement: "What any other reading colors to is stated by that reading's own scale.",
    },
  ],
} as const satisfies ReadoutGroup
