import type { PageType } from "@akasha/pages/page-type"

export const ctwTeam = {
  id: "01a06579-e4f7-77d8-a696-adb848da2d3e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "ctw-team",
  definition: "one demining organisation a player of Clear the World plays as",
  pluralSlug: "ctw-teams",
  extends: ["page-type/page"],
  parts: [
    "number-property/cells-cleared",
    "number-property/craters",
    "number-property/hazards-marked",
    "number-property/zones-completed",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/cells-cleared", required: true, many: false },
    { pageProperty: "number-property/craters", required: true, many: false },
    { pageProperty: "number-property/hazards-marked", required: true, many: false },
    { pageProperty: "number-property/zones-completed", required: true, many: false },
    { pageProperty: "text-property/hex", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A team is a real demining organisation.",
    },
    {
      invariantKind: "departure",
      statement: "The four counts are the team's running totals across every player.",
    },
    {
      invariantKind: "departure",
      statement: "A hex is the color the team is drawn in.",
    },
  ],
  types: "ts",
} as const satisfies PageType
