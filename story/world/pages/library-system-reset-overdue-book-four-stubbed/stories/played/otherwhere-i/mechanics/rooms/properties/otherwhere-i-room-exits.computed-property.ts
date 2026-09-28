import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const otherwhereIRoomExits = {
  id: "01a0e85e-5914-79c3-9ba6-92e60f4b03aa",
  type: "page-type/computed-property",
  slug: "otherwhere-i-room-exits",
  propertySlug: "exits",
  definition: "the rooms of the Library a room's place has exits to, each with its direction",
  holds: "records",
  properties: [
    {
      pageProperty: "relation-property/otherwhere-the-library-room-exit-to",
      required: true,
      many: false,
    },
    { pageProperty: "select-property/place-exit-direction", required: false, many: false },
  ],
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A room's exits are its place's exits to the places other rooms are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An exit to a place no room is has no room here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An exit is here only where its room is shown to every character this room is shown to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A room shown to no character has no exits here.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
