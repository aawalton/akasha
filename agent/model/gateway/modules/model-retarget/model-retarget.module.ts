import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelRetarget = {
  id: "01a0d3c4-c2d6-736f-8c27-b3311b4b2d48",
  type: "page-type/module",
  slug: "model-retarget",
  definition: "the model a request names, sent as the wire id its logical name now has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The wire id a logical name has moves, and a client names the wire id it knows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wire id no longer served is sent as the wire id that took its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The wire id a logical name has is read off the vocabulary rather than written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body already naming the wire id to be sent is rewritten nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming no model this system knows is rewritten nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The extended-context marker a body carries is carried onto the model sent.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here sends a request.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here chooses which account serves a request.",
    },
  ],
} as const satisfies Module
