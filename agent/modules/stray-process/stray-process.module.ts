import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const strayProcess = {
  id: "01a09cd4-c1f0-776c-825d-f33fe4f0576c",
  type: "module",
  slug: "stray-process",
  definition: "a process still running under a subagent that has departed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process is a stray where the transcript records its subagent returned.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process is a stray where the index carries no page for its subagent's seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether the seat has a page is read before the transcript is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index that would not answer leaves the subagent unread rather than gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process whose subagent the transcript names as working is no stray.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process whose subagent the transcript could not be read for is no stray.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading says which subagents it could not tell about.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process stating an acting agent that names no subagent is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The environment a process was started with does not carry a name exported inside that process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A shell a tool call runs in is therefore named by its command line rather than by its environment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The command line is read only in the shape the harness composes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A command line that merely mentions an acting agent names none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The environment is taken where the two disagree.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page's body is read to tell whether a subagent has returned.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "An index read as carrying no page where it would not answer would make every seat look gone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "How long a process has run is not read here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here signals or ends a process.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A subagent's page goes only once what that subagent left running has stopped.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A page that outlives its subagent that way says nothing, so no page is read here.",
    },
  ],
} as const satisfies Module
