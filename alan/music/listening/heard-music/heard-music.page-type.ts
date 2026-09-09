import type { PageType } from "@akasha/pages/page-type"

export const heardMusic = {
  id: "01a06240-340f-700a-be22-823bb6c905f7",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "heard-music",
  definition: "every track one person has heard",
  pluralSlug: "heard-music",
  extends: ["page-type/page"],
  parts: ["page-property-entry/tracks"],
  properties: [
    { pageProperty: "relation-property/person", required: true, many: false },
    { pageProperty: "page-property-entry/tracks", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One person has one heard music page.",
    },
    {
      invariantKind: "departure",
      statement: "A track entered into a heard music page is never taken out.",
    },
  ],
  types: "ts",
} as const satisfies PageType
