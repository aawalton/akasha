import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatSession = {
  id: "01a06949-b281-709f-96f4-45790933cf1e",
  type: "page-type/module",
  slug: "seat-session",
  definition: "the session a seat is bound to and the transcript that session writes",
  parts: [
    "module/seat-session-resolve",
    "module/seat-transcript-path",
    "module/seat-transcript-rotation",
  ],
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's session is read off its page rather than beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat whose page has gone is read out of the history that seat was committed into.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value shaped as anything but a uuid is no session.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session cannot be observed again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session is committed with the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Keeping a session does nothing.",
    },
  ],
} as const satisfies Module
