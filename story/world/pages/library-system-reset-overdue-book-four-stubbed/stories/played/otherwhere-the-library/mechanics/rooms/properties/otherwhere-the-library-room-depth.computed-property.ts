import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const otherwhereTheLibraryRoomDepth = {
  id: "01a0e85e-5913-77e3-9bc2-3b57e016eb79",
  type: "page-type/computed-property",
  slug: "otherwhere-the-library-room-depth",
  propertySlug: "depth",
  definition: "the depth of the place a room of the Library is",
  holds: "number",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A room takes the depth its place states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A room whose place states no depth has none.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
