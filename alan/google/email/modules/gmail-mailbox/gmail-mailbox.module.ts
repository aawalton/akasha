import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailMailbox = {
  id: "01a0657c-604c-7003-9159-bb1811c11e74",
  type: "module",
  slug: "gmail-mailbox",
  definition: "the Gmail mailbox reached over HTTP as summaries, raw bytes and labels",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An access token within a minute of expiring is refreshed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A summary has only the seven headers the mailbox asks Gmail for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A history id Gmail no longer has answers as nothing rather than as a fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unanswered history id is followed by a listing of the whole inbox.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Bytes are sent unchanged rather than built from a composition.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "This mailbox and `gmail-client` are the same Gmail client.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Raw message bytes and a raw send are reached through `gmail-messages`.",
    },
  ],
} as const satisfies Module
