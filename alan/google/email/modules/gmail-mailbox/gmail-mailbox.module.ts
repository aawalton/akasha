import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailMailbox = {
  id: "01a0657c-604c-7003-9159-bb1811c11e74",
  type: "page-type/module",
  slug: "gmail-mailbox",
  definition: "the Gmail mailbox reached over HTTP as summaries, raw bytes and labels",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A summary has only the seven headers the mailbox asks Gmail for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A history id Gmail no longer has answers as nothing rather than as a fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unanswered history id is followed by a listing of the whole inbox.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bytes are sent unchanged rather than built from a composition.",
    },
  ],
} as const satisfies Module
