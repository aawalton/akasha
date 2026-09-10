import type { PageType } from "@akasha/pages/page-type"

export const lifeTheme = {
  id: "01a06575-c2c0-7479-ae1f-92956ac3d48e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "life-theme",
  definition: "a stretch of Alan's life given over to one of his values",
  pluralSlug: "life-themes",
  extends: ["page-type/page"],
  parts: [
    "calendar-date-property/end-date",
    "calendar-date-property/start-date",
    "relation-property/life-theme-parent",
    "relation-property/life-theme-value",
    "select-property/life-theme-status",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "calendar-date-property/end-date", required: false, many: false },
    { pageProperty: "relation-property/life-theme-parent", required: false, many: false },
    { pageProperty: "calendar-date-property/start-date", required: false, many: false },
    { pageProperty: "select-property/life-theme-status", required: true, many: false },
    { pageProperty: "relation-property/life-theme-value", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A life theme is under one value.",
    },
    {
      invariantKind: "departure",
      statement: "A life theme is under another life theme or under no life theme.",
    },
  ],
  types: "ts",
} as const satisfies PageType
