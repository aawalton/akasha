import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { ColorSlug } from "../../readout-system/readouts/properties/color-slug.text-property.ts"

export type SeatTurnState = Domain & {
  colorSlug: ColorSlug
}

export const seatTurnState = {
  id: "01a06924-e882-736f-8cac-465ef2b5d799",
  pageTypeSlug: "page-type",
  slug: "seat-turn-state",
  definition: "what a seat is doing about its turn, and the color that is drawn in",
  pluralSlug: "seat-turn-states",
  extendsSlug: "page-type/domain",
  partSlugs: [
    "seat-turn-state/idle",
    "seat-turn-state/idle-pending",
    "seat-turn-state/stopped",
    "seat-turn-state/working",
    "text-property/color-slug",
  ],
  properties: [{ pagePropertySlug: "color-slug", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat is in one turn state at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A state's slug is the name the seat system reads that state by.",
    },
    {
      invariantKind: "departure",
      statement: "Every turn state names a color, a stopped one included.",
    },
    {
      invariantKind: "departure",
      statement: "A color here is a name a palette resolves rather than a shade.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which agent is in which state.",
    },
  ],
} as const satisfies PageType
