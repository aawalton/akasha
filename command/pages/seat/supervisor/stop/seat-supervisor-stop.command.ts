import type { Command } from "akasha/command/command.page-type.types.ts"

export const seatSupervisorStop = {
  id: "01a0797a-9a6f-7d91-bfd8-0ac01ac70fcd",
  type: "page-type/command",
  slug: "seat-supervisor-stop",
  definition: "the command ending a seat's supervisor and taking the page that seat held",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop ends what the seat dispatched before it ends the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The report names what moved off a subagent before it names the stop.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seat stopped is named by the first word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop reaches one seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A name no seat has a page for is answered apart from a word this command does not take.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat to stop is named as that seat's page is named.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here stops a seat by anything but the name its page carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop whose processes did not all end is refused rather than reported as done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop refused after it wrote names each write that stop finished.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop refused before it wrote anything is refused as the fault alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop that threw rather than refused names each write that stop finished.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop that threw names those writes in the order that stop finished them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop that threw carries the kind of fault the throw names.",
    },
  ],
  name: "stop",
  arguments: [
    { argument: "argument/force" },
    { argument: "argument/seat", required: true, saidAs: "word" },
  ],
} as const satisfies Command
