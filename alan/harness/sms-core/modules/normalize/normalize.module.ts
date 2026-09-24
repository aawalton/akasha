import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const normalize = {
  id: "01a05b6f-999d-7245-878b-3293cdfb33fb",
  type: "page-type/module",
  slug: "normalize",
  definition: "the words the channel shows for a message it carried or would not carry",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A refusal notice has no part of the message the notice refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message with nothing but space and no picture in the message is shown as having no body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture a message carries is shown as the address the carrier holds it at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The account a message acts for is written into the surface a seat reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sender is lower-cased before the sender is matched.",
    },
  ],
} as const satisfies Module
