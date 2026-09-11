import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const drive = {
  id: "01a06746-de46-7a10-980b-3134872d9f6b",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "drive",
  definition: "what makes a person want to act",
  pluralSlug: "drives",
  extends: ["page-type/domain"],
  parts: [
    "drive/game-design-drive-collection",
    "drive/game-design-drive-connection",
    "drive/game-design-drive-creativity",
    "drive/game-design-drive-loss",
    "drive/game-design-drive-meaning",
    "drive/game-design-drive-novelty",
    "drive/game-design-drive-progress",
    "drive/game-design-drive-scarcity",
    "number-property/octalysis-number",
    "record-property/octalysis",
    "text-property/octalysis-definition",
    "text-property/octalysis-name",
  ],
  properties: [{ pageProperty: "record-property/octalysis", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
