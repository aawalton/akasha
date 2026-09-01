import type { Module } from "@akasha/code-system/module"

export const seatStopping = {
  id: "01a05d02-889b-7880-9ab9-c72cdc79dc5c",
  pageTypeSlug: "module",
  slug: "seat-stopping",
  definition: "a seat brought to an end, and the pages it held taken with it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What is signalled is every process carrying the agent's id rather than the page's supervisor alone.",
    },
    {
      invariantKind: "departure",
      statement: "The caller's own process is never signalled.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat whose processes are all gone is ended by ending the session that carried it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat with neither a process nor a session left is answered by taking its page alone.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's page is taken only once every process it named is gone.",
    },
    {
      invariantKind: "departure",
      statement: "The values beside a seat's page go with the page.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's page goes before its seat is signalled.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat with subagents working is refused unless the caller says to end the subagents with the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat nothing is running in is stopped without that refusal.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process is the agent's own where its command line names a supervisor or a client.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a seat or writes what a seat states.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a seat by anything but its name.",
    },
  ],
} as const satisfies Module
