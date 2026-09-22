import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const riffBytes = {
  id: "01a07c81-bfd9-78c8-90fa-e6dee251111a",
  type: "page-type/module",
  slug: "riff-bytes",
  definition: "the bytes a voice service answered, weighed for a wav's opening header",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A payload no longer than a wav header is no wav.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A payload is weighed by the four bytes that payload opens with.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the sound a payload has past its header.",
    },
  ],
} as const satisfies Module
