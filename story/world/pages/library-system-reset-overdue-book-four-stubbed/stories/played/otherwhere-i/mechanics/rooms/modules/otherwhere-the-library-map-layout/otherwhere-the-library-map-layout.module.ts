import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const otherwhereTheLibraryMapLayout = {
  id: "01a0e863-bc42-789f-a623-475bb544d5dd",
  type: "page-type/module",
  slug: "otherwhere-the-library-map-layout",
  definition: "where each room shown on the Library's map sits, by its exits and depth",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A room sits one cell from a room its exit reaches, the way that exit's direction says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An exit up or down puts its room in the same cell on the floor that room is on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An exit with no told direction puts its room in the nearest free cell.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link drawn for an exit with no told direction is drawn apart from a told one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A room with no depth takes the floor of a room it connects to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Floors run from the highest depth down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A room with no exit to a room on the map sits apart from the floors.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One column runs through every floor, so a stair joins rooms in one column.",
    },
  ],
} as const satisfies Module
