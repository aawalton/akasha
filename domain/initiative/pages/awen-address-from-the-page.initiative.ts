import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenAddressFromThePage = {
  id: "01a18dff-1a43-7295-8d76-645ac37be816",
  type: "page-type/initiative",
  slug: "awen-address-from-the-page",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-one-seat-polish",
  constraints: [
    "Alan has approved every directive this initiative needs to land.",
    "No turn is taken, no message sent and nothing advanced in gifted-reborn, which is Alan's real save.",
  ],
  createdAt: "2026-10-30T18:07:48.290Z",
  updatedAt: "2026-10-30T18:07:59.312Z",
  intentStack: [{ statement: "Address From The Page matches how checks read pages now." }],
} as const satisfies Initiative
