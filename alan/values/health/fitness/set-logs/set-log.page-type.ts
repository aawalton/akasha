import type { PageType } from "@akasha/pages/page-type"

export const setLog = {
  id: "01a06580-66fc-7e15-9138-eda9b0267961",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "set-log",
  definition: "one set Alan performed, as it was recorded",
  pluralSlug: "set-logs",
  extends: ["page-type/page"],
  parts: [
    "boolean-property/is-warmup",
    "calendar-date-property/set-log-date",
    "number-property/distance",
    "number-property/duration-seconds",
    "number-property/reps",
    "number-property/rpe",
    "number-property/set-number",
    "number-property/weight",
    "relation-property/exercise",
    "text-property/session-slug",
    "relation-property/day",
    "computed-property/set-volume",
    "select-property/activity-type",
    "text-property/note",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/activity-type", required: false, many: false },
    { pageProperty: "number-property/distance", required: false, many: false },
    { pageProperty: "number-property/duration-seconds", required: false, many: false },
    { pageProperty: "relation-property/exercise", required: true, many: false },
    { pageProperty: "boolean-property/is-warmup", required: false, many: false },
    { pageProperty: "text-property/note", required: false, many: false },
    { pageProperty: "number-property/reps", required: false, many: false },
    { pageProperty: "number-property/rpe", required: false, many: false },
    { pageProperty: "text-property/session-slug", required: true, many: false },
    { pageProperty: "calendar-date-property/set-log-date", required: true, many: false },
    { pageProperty: "relation-property/day", required: true, many: false },
    { pageProperty: "number-property/set-number", required: true, many: false },
    { pageProperty: "number-property/weight", required: false, many: false },
    { pageProperty: "computed-property/set-volume", required: false, many: false },
  ],
  worked: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A set states the bout that set was logged in and names the movement that set was of.",
    },
    {
      invariantKind: "departure",
      statement: "A set states the day that set was performed.",
    },
    {
      invariantKind: "departure",
      statement: "A set names the tracked day that set falls on.",
    },
    {
      invariantKind: "departure",
      statement: "The day a set names is the day that set's own date spells.",
    },
    {
      invariantKind: "absence",
      statement: "A set states no volume of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A set's volume is worked out from the set and the movement and the lifter.",
    },
    {
      invariantKind: "departure",
      statement:
        "A set timed rather than counted has an activity and a length in place of reps and weight.",
    },
  ],
  types: "ts",
} as const satisfies PageType
