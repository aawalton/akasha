import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildShowFields = {
  id: "01a159b7-e764-7160-8e27-0ea96685bbd4",
  type: "page-type/module",
  slug: "build-show-fields",
  definition: "what a build holds, as named values grouped under a section",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value is named by its section and its key, and two builds are set side by side by that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A gear piece says its set, weight, kind, quality, trait and enchant in one value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A passive says its rank and its skill line, under a section for its line's category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive the hash states no rank for says so rather than taking a rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chosen class mastery says its class, and a build choosing none says none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star's points come from a reading, since the hash holds none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star slotted in another constellation's slot is an empty slot and is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The stats are the fifteen a reading reports, worked out for each bar from the build alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value only one build has is set against none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Differences keep the order of the sections they fall in.",
    },
  ],
  createdAt: "2026-10-20T14:29:46.979Z",
  updatedAt: "2026-10-21T14:07:30.892Z",
} as const satisfies Module
