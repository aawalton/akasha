import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const fitnessCoachingNote = {
  id: "01a08181-f205-7092-900f-58e2075a7529",
  type: "page-type/page-type",
  slug: "fitness-coaching-note",
  definition: "a note that guides the training Alan is given",
  parts: [
    "boolean-property/fitness-coaching-note-active",
    "calendar-date-property/fitness-coaching-note-date",
    "file-property/says",
    "number-property/fitness-coaching-note-sort-order",
    "select-property/fitness-coaching-note-kind",
    "select-property/focus-tags",
  ],
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "boolean-property/fitness-coaching-note-active",
      required: true,
      many: false,
    },
    { pageProperty: "select-property/focus-tags", required: true, many: true, maxCount: null },
    { pageProperty: "select-property/fitness-coaching-note-kind", required: true, many: false },
    {
      pageProperty: "calendar-date-property/fitness-coaching-note-date",
      required: false,
      many: false,
    },
    {
      pageProperty: "number-property/fitness-coaching-note-sort-order",
      required: false,
      many: false,
    },
    { pageProperty: "file-property/says", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A note's words are in a file of their own rather than in a value beside that note.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-08T14:52:52.101Z",
  updatedAt: "2026-10-30T16:53:03.627Z",
} as const satisfies PageType
