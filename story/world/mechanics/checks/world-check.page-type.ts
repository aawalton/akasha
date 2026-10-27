import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldCheck = {
  id: "01a0de14-272c-7450-9354-16bc47966044",
  type: "page-type/page-type",
  slug: "world-check",
  definition: "a rule settling a declared action",
  pluralSlug: "checks",
  extends: ["page-type/world-mechanic", "page-type/domain"],
  parts: [
    "module-property-group/settling",
    "boolean-property/difficulty-moved",
    "world-check/tower-attack-resolution",
    "world-check/tower-attribute-check",
    "world-check/tower-essence-absorption",
    "world-check/the-dating-game-closeness-scoring",
    "world-check/dragons-and-dungeons-check",
    "world-check/test-story-action-check",
    "world-check/gifted-reborn-time-passing",
    "world-check/test-story-time-passing",
    "world-check/test-story-training",
    "world-check/test-story-upkeep",
  ],
  properties: [
    { pageProperty: "module-property-group/settling", required: true, many: false },
    { pageProperty: "boolean-property/difficulty-moved", required: false, many: false },
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
        "A check's code and its test read a page's address off that page's slug by importing the page.",
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
  updatedAt: "2026-10-27T19:51:55.341Z",
} as const satisfies PageType
