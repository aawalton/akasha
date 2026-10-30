import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const lifeTheme = {
  id: "01a06575-c2c0-7479-ae1f-92956ac3d48e",
  type: "page-type/page-type",
  slug: "life-theme",
  definition: "a time in Alan's life that is given to a life value",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "life theme" },
    { partOfSpeech: "part-of-speech/noun", spelling: "life themes" },
  ],
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
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A life theme is under one value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A life theme is under another life theme or under no life theme.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T04:10:11.520Z",
  updatedAt: "2026-10-30T16:31:28.538Z",
} as const satisfies PageType
