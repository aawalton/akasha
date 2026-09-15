import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const calendarEventing = {
  id: "01a08cf3-9ae4-7945-85d6-5e525ca7e8cf",
  type: "module",
  slug: "calendar-eventing",
  definition: "what an act on a calendar event takes, and the call that act makes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An act that writes an event reaches the calendar as Alan.",
    },
    {
      invariantKind: "departure",
      statement: "An act that only reads reaches the calendar as the account akasha runs under.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "departure",
      statement: "A call the calendar threw on exits with the code that throw carries.",
    },
    {
      invariantKind: "departure",
      statement: "A throw carrying no code of its own is operational rather than of no known kind.",
    },
    {
      invariantKind: "absence",
      statement: "No guard is written here; the guard every command body runs inside is used.",
    },
    {
      invariantKind: "departure",
      statement: "An act is handed a list to name each write on as the calendar takes that write.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call that threw is answered with what that list holds, reported and named in the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A call that threw with nothing on that list is answered as the fault alone.",
    },
    {
      invariantKind: "absence",
      statement:
        "No word of the call is read here; each act takes its words through the one reader.",
    },
  ],
} as const satisfies Module
