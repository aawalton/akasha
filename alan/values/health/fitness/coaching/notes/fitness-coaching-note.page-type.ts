import type { PageType } from "@akasha/pages/page-type"

export const fitnessCoachingNote = {
  id: "01a08181-f205-7092-900f-58e2075a7529",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "fitness-coaching-note",
  definition: "a limit, a cue or a thing noticed that the coach programs by",
  pluralSlug: "fitness-coaching-notes",
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
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A note's words are in a file of their own rather than in a value beside that note.",
    },
  ],
  types: "ts",
} as const satisfies PageType
