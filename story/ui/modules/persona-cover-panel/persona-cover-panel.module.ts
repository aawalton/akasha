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
  ],
} as const satisfies Module
