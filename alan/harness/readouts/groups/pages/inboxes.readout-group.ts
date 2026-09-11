import type { ReadoutGroup } from "akasha/alan/harness/readouts/groups/readout-group.page-type.types.ts"

export const inboxes = {
  id: "01a06230-b155-7b8c-9044-28e5319d83e7",
  type: "readout-group",
  slug: "inboxes",
  definition: "how far each of Alan's inboxes is from empty",
  sortOrder: "place",
  figureOffScale: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A daily inbox of at least a hundred readings is black rather than a reading gone missing.",
    },
    {
      invariantKind: "departure",
      statement: "An inbox at empty is blue.",
    },
    {
      invariantKind: "departure",
      statement: "The color any other reading takes is stated by that reading's own scale.",
    },
  ],
} as const satisfies ReadoutGroup
