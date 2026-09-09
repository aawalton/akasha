import type { Module } from "@akasha/code/module"

export const seatSession = {
  id: "01a06949-b281-709f-96f4-45790933cf1e",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-session",
  definition: "the claude session a seat is bound to, read off its page or its history",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's session is read off its page rather than beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat whose page has gone is read out of the history that seat was committed into.",
    },
    {
      invariantKind: "departure",
      statement: "A value shaped as anything but a uuid is no session.",
    },
    {
      invariantKind: "departure",
      statement: "A session cannot be observed again.",
    },
    {
      invariantKind: "departure",
      statement: "A session is committed with the page.",
    },
    {
      invariantKind: "departure",
      statement: "Keeping a session does nothing.",
    },
  ],
} as const satisfies Module
