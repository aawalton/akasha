import type { Command } from "../../../../command.page-type.ts"

export const seatSupervisorStop = {
  id: "01a0797a-9a6f-7d91-bfd8-0ac01ac70fcd",
  pageTypeSlug: "command",
  type: "command",
  slug: "seat-supervisor-stop",
  definition: "the command ending a seat's supervisor and taking the page that seat held",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "<name>", takes: "the seat to stop, named as that seat's page is named" },
    { said: "--force", takes: "stop it though subagents are working, ending them with it" },
  ],
  helpNotes: [
    "a stop reaches one seat, where a restart reaches every seat akasha carries.",
    "a stop ends what the seat dispatched before it ends the seat, so nothing is left orphaned.",
    "a name no seat holds a page for answers as a data refusal, which a caller can tell from a misspelling.",
    "a stop names one seat, spelled as that seat's page is spelled rather than as an id.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seat stopped is named by the first word.",
    },
    {
      invariantKind: "departure",
      statement: "A stop reaches one seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name no seat has a page for is answered apart from a word this command does not take.",
    },
    {
      invariantKind: "departure",
      statement: "A seat to stop is named as that seat's page is named.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here stops a seat by anything but the name its page carries.",
    },
  ],
} as const satisfies Command
