import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldCheck = {
  id: "01a0de14-272c-7450-9354-16bc47966044",
  type: "page-type/page-type",
  slug: "world-check",
  definition: "a rule settling a declared action",
  pluralSlug: "checks",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "world check" },
    { partOfSpeech: "part-of-speech/noun", spelling: "world checks" },
  ],
  extends: ["page-type/world-mechanic", "page-type/domain"],
  parts: [
    "module-property-group/settling",
    "boolean-property/difficulty-moved",
    "page-type/action-difficulty",
    "page-type/outcome-tier",
    "world-check/test-story-action-check",
    "world-check/gifted-reborn-time-passing",
    "world-check/gifted-reborn-action-check",
    "world-check/gifted-reborn-practice",
    "world-check/gifted-reborn-steps-earned",
    "world-check/test-story-time-passing",
    "world-check/test-story-training",
    "world-check/test-story-upkeep",
    "relation-property/settled-by",
    "world-check/gifted-trial2-action-check",
    "world-check/gifted-trial2-practice",
    "world-check/gifted-trial2-steps-earned",
    "world-check/gifted-trial2-time-passing",
  ],
  properties: [
    { pageProperty: "module-property-group/settling", required: false, many: false },
    { pageProperty: "boolean-property/difficulty-moved", required: false, many: false },
    { pageProperty: "relation-property/settled-by", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A check's code is handed a reading and the dice rolled, and answers what they settle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check that rolls nothing is handed no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A check carries its own `settling` or names in `settledBy` the check settling it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing a check's code does rolls a die.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check refuses a reading that is not the shape its code reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A check's code and its test name a page by importing that page, never by spelling its address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A check's code reads the pages of the character a reading names off the index, importing none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "So a check copied to a clone, settled by its source's code, reads the clone's pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A check's code may export `next`, answering one session's reading and answer with the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "`next` answers `{ reading, crossed, left }`: the next reading, what was crossed, why it left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A crossed name is what one session crossed into, such as a rung or a tier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`left` is null, or says why a session left the routine the player asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check with no `next` is no montage's activity or upkeep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story's upkeep is its check `<story>-upkeep`, charged each montage session.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  loadedExport: ["settled", "added", "next"],
  createdAt: "2026-09-26T14:17:37.836Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies PageType
