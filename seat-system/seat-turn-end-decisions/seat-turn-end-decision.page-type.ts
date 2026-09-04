import type { PageType } from "@akasha/pages-system/page-type"

export const seatTurnEndDecision = {
  id: "01a06837-f101-709f-91d8-32682a83f871",
  pageTypeSlug: "page-type",
  slug: "seat-turn-end-decision",
  definition: "one ruling on whether an agent may go idle",
  pluralSlug: "seat-turn-end-decisions",
  extendsSlug: "page-type/page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every guard's rulings stand together rather than one store to a guard.",
    },
    {
      invariantKind: "departure",
      statement: "A ruling names the guard that made it.",
    },
    {
      invariantKind: "departure",
      statement: "A ruling either allows the turn end or refuses it.",
    },
    {
      invariantKind: "departure",
      statement: "A ruling is kept whether or not the turn end it ruled on was refused.",
    },
    {
      invariantKind: "gap",
      statement: "A turn end guard keeps the ruling the guard made.",
    },
  ],
} as const satisfies PageType
