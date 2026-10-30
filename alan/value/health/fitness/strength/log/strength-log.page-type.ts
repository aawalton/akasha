import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const strengthLog = {
  id: "01a06580-66fc-7e15-9138-eda9b0267961",
  type: "page-type/page-type",
  slug: "strength-log",
  definition: "an exercise set Alan has performed",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "exercise set" },
    { partOfSpeech: "part-of-speech/noun", spelling: "exercise sets" },
  ],
  extends: ["page-type/page"],
  parts: [
    "boolean-property/is-warmup",
    "computed-property/set-volume",
    "instant-property/set-performed-at",
    "number-property/distance",
    "number-property/duration-seconds",
    "number-property/reps",
    "number-property/rpe",
    "number-property/set-number",
    "number-property/weight",
    "relation-property/day",
    "relation-property/exercise",
    "select-property/activity-type",
    "text-property/note",
    "text-property/workout-slug",
    "relation-property/gym",
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
    { pageProperty: "text-property/workout-slug", required: true, many: false },
    { pageProperty: "relation-property/day", required: true, many: false },
    { pageProperty: "number-property/set-number", required: true, many: false },
    { pageProperty: "number-property/weight", required: false, many: false },
    { pageProperty: "computed-property/set-volume", required: false, many: false },
    { pageProperty: "instant-property/set-performed-at", required: false, many: false },
    { pageProperty: "relation-property/gym", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An exercise set states the workout it was logged in and names the movement it was of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An exercise set states the instant Alan performed it, where that instant was recorded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An exercise set names the tracked day that exercise set falls on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An exercise set logged before instants were kept states no instant, and names only its day.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An exercise set states no volume of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An exercise set's volume is worked out from the exercise set and the movement and the lifter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An exercise set timed rather than counted has an activity and a length in place of reps and weight.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "Every exercise set Alan performs reaches a page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T04:21:48.924Z",
  updatedAt: "2026-10-30T17:43:48.642Z",
} as const satisfies PageType
