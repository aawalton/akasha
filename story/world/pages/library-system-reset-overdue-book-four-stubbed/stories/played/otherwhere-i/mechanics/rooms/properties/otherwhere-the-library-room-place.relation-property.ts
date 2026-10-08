import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const otherwhereTheLibraryRoomPlace = {
  id: "01a0e859-c246-7a14-a0e6-042516b42bb9",
  type: "page-type/relation-property",
  slug: "otherwhere-the-library-room-place",
  propertySlug: "place",
  definition: "the place a room of the Library is",
  targetPageType: "page-type/place",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A room's place holds the room's exits and depth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A room whose place has no page yet names no place.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-28T14:09:51.686Z",
  updatedAt: "2026-09-28T22:48:45.000Z",
} as const satisfies RelationProperty
