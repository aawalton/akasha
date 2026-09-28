import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const otherwhereTheLibraryRoomShownTo = {
  id: "01a0e835-b5ed-76dc-8197-0187f1a78ff6",
  type: "page-type/multi-relation-property",
  slug: "otherwhere-the-library-room-shown-to",
  propertySlug: "shown-to",
  definition: "the characters the Library's map has shown a room to",
  targetPageType: "page-type/world-character",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character a room is shown to has been told its name and whether it is lit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A room gains characters here and never loses one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A map asks the server for the rooms shown to its character and no others.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
