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
} as const satisfies RelationProperty
