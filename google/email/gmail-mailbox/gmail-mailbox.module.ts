import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const gmailMailbox = {
  id: "01a0657c-604c-7003-9159-bb1811c11e74",
  pageTypeSlug: "module",
  slug: "gmail-mailbox",
  definition: "the Gmail mailbox reached over HTTP as summaries, raw bytes and labels",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An access token within a minute of expiring is refreshed.",
    },
    {
      invariantKind: "departure",
      statement: "A summary carries only the six headers the mailbox asks Gmail for.",
    },
    {
      invariantKind: "departure",
      statement: "A history id Gmail no longer holds answers as nothing rather than as a fault.",
    },
    {
      invariantKind: "departure",
      statement: "An unanswered history id is followed by a listing of the whole inbox.",
    },
    {
      invariantKind: "departure",
      statement: "Bytes are sent unchanged rather than built from a composition.",
    },
    {
      invariantKind: "gap",
      statement: "This mailbox and `gmail-client` are the same Gmail client.",
    },
    {
      invariantKind: "gap",
      statement: "Raw message bytes and a raw send are reached through `gmail-messages`.",
    },
  ],
} as const satisfies Module
