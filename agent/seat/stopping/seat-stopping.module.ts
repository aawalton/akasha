import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatStopping = {
  id: "01a05d02-889b-7880-9ab9-c72cdc79dc5c",
  type: "page-type/module",
  slug: "seat-stopping",
  definition: "a seat brought to an end, and the pages it held taken with it",
  parts: ["module/kill-target-plan", "module/stop-seat", "module/takeover-seat"],
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every process with the agent's id is signalled rather than the page's supervisor alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The caller's own process is never signalled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat whose processes are all gone is ended by ending the session that had that seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat with neither a process nor a session left is answered by taking its page alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's page is taken only once every process that seat named is gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat whose processes did not all end is refused naming the pids that were signalled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop names each write it finished as that stop goes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop whose landing refused the page is refused rather than answered as done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The values beside a seat's page go once that page has gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The messages waiting for a seat go with that seat, since nobody is left to read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message is taken before the seat is signalled, as a subagent's page is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop the landing refused leaves the seat naming the process it named before.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page taken away goes through the change removing a file of any kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files a page claims go with that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "What a subagent left unlanded is moved onto its seat before that subagent's page goes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What was moved onto the seat is said back to whoever asked for the stop.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing is moved onto a seat whose page is not there to hold it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The landing a page goes through is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent's page goes before its seat is signalled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat with subagents working is refused unless the caller says to end the subagents with the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat nothing is running in is stopped without that refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A process is the agent's own where the process command line names a supervisor or a client.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here starts a seat or writes the values a seat states.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a seat by anything but its name.",
    },
  ],
} as const satisfies Module
