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
      statement: "Each act states the flags that act takes and the flags that act needs.",
    },
    {
      invariantKind: "departure",
      statement: "A flag no act states is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "An act naming an event says whether that event is named in place.",
    },
    {
      invariantKind: "departure",
      statement: "An event named in place and as a flag is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A recurrence rule is kept once over for each rule rather than parted by commas.",
    },
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
      statement: "A flag this act does not take is a fault of the input.",
    },
    {
      invariantKind: "departure",
      statement: "A call the calendar threw on exits with the code that throw carries.",
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
      statement: "No act word is read here, because the namespace walked names the act.",
    },
  ],
} as const satisfies Module
