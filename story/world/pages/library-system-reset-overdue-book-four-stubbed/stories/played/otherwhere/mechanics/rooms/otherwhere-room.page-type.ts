import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereRoom = {
  id: "01a0e834-91e0-78f1-ba2a-bdbdabf299fd",
  type: "page-type/page-type",
  slug: "otherwhere-room",
  definition: "a room of the Library in Otherwhere, lit where it has power",
  pluralSlug: "rooms",
  extends: ["page-type/world-mechanic"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A room's title is the name the story has told the player for that room.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A room is drawn on Nala's map only once the story has shown her that room there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A room the game master knows but has not shown on the map is still kept lit or dark.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: [
    "boolean-property/otherwhere-room-lit",
    "multi-relation-property/otherwhere-room-shown-to",
    "module/otherwhere-map",
    "module/otherwhere-map-layout",
    "relation-property/otherwhere-room-place",
    "computed-property/otherwhere-room-depth",
    "computed-property/otherwhere-room-exits",
    "relation-property/otherwhere-room-exit-to",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "boolean-property/otherwhere-room-lit", required: true, many: false },
    {
      pageProperty: "multi-relation-property/otherwhere-room-shown-to",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "relation-property/otherwhere-room-place", required: false, many: false },
    { pageProperty: "computed-property/otherwhere-room-depth", required: false, many: false },
    { pageProperty: "computed-property/otherwhere-room-exits", required: false, many: false },
  ],
} as const satisfies PageType
