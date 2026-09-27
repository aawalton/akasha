import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const personaCoverPanel = {
  id: "01a0de7e-118e-760a-aace-b82f91d94001",
  type: "page-type/module",
  slug: "persona-cover-panel",
  definition: "the covers of the personas the latest turn of play is with",
  code: "tsx",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The personas drawn are the ones the characters of the latest turn drawn are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn with no character who is a persona draws no panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona with no cover is left out rather than drawn empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The turn, its characters and their personas are each read by name rather than as a whole page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is read for a step whose names the step before has not given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cover is asked for at twice the width the panel draws it.",
    },
  ],
} as const satisfies Module
