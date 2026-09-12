import type { Command } from "akasha/commands/command.page-type.types.ts"

export const seatSupervisorStop = {
  id: "01a0797a-9a6f-7d91-bfd8-0ac01ac70fcd",
  type: "command",
  slug: "seat-supervisor-stop",
  definition: "the command ending a seat's supervisor and taking the page that seat held",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stop ends what the seat dispatched before it ends the seat.",
    },
    {
      invariantKind: "departure",
      statement: "The report names what moved off a subagent before it names the stop.",
    },
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
    {
      invariantKind: "departure",
      statement: "A stop whose processes did not all end is refused rather than reported as done.",
    },
    {
      invariantKind: "departure",
      statement: "A stop refused after it wrote names each write that stop finished.",
    },
    {
      invariantKind: "departure",
      statement: "A stop refused before it wrote anything is refused as the fault alone.",
    },
    {
      invariantKind: "departure",
      statement: "A stop that threw rather than refused names each write that stop finished.",
    },
    {
      invariantKind: "departure",
      statement: "A stop that threw names those writes in the order that stop finished them.",
    },
    {
      invariantKind: "departure",
      statement: "A stop that threw carries the kind of fault the throw names.",
    },
  ],
  name: "stop",
  arguments: [
    { argument: "argument/force" },
    { argument: "argument/seat", required: true, saidAs: "word" },
  ],
} as const satisfies Command
