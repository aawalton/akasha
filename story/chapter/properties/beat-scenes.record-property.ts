import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const beatScenes = {
  id: "01a1023a-d04c-73b4-a605-8884ed96efcb",
  type: "page-type/record-property",
  slug: "beat-scenes",
  propertySlug: "beat-scenes",
  definition: "the game master's part of one beat: its time, its place and who is there",
  properties: [
    { pageProperty: "number-property/beat-scene-beat", required: true, many: false },
    { pageProperty: "instant-property/beat-scene-at", required: false, many: false },
    { pageProperty: "relation-property/beat-scene-place", required: false, many: false },
    {
      pageProperty: "multi-relation-property/beat-scene-present",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "multi-relation-property/beat-scene-arrive",
      required: false,
      many: true,
      maxCount: null,
    },
    {
      pageProperty: "multi-relation-property/beat-scene-leave",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a beat that changes the time, the place or who is there has a record here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The records run in beat order, one to a beat at most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master's advance replaces these records whole.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
