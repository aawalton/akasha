import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bodyText = {
  id: "01a04fa7-aae4-77e8-8e0c-b9e61046b33b",
  type: "page-type/module",
  slug: "body-text",
  definition: "a file body as the text it holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One decoder serves every body read through here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path with nothing at that path says nothing rather than empty text.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Bytes that are not text read as the replacement character rather than refusing.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A caller that must refuse bytes that are not text reaches for a decoder that is fatal.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "That gate is not here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows the meaning of the text or which file the text came from.",
    },
  ],
} as const satisfies Module
