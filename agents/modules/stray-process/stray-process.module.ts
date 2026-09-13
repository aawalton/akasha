import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const strayProcess = {
  id: "01a09cd4-c1f0-776c-825d-f33fe4f0576c",
  type: "module",
  slug: "stray-process",
  definition: "a process still running under a subagent that has returned",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A process is a stray where the seat's transcript names its subagent as returned.",
    },
    {
      invariantKind: "departure",
      statement: "A process whose subagent the transcript names as working is no stray.",
    },
    {
      invariantKind: "departure",
      statement: "A process whose subagent the transcript could not be read for is no stray.",
    },
    {
      invariantKind: "departure",
      statement: "A reading says which subagents it could not tell about.",
    },
    {
      invariantKind: "departure",
      statement: "A process stating an acting agent that names no subagent is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "The environment a process was started with does not carry a name exported inside that process.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shell a tool call runs in is therefore named by its command line rather than by its environment.",
    },
    {
      invariantKind: "departure",
      statement: "The command line is read only in the shape the harness composes.",
    },
    {
      invariantKind: "absence",
      statement: "A command line that merely mentions an acting agent names none.",
    },
    {
      invariantKind: "departure",
      statement: "The environment is taken where the two disagree.",
    },
    {
      invariantKind: "absence",
      statement: "No page is read to tell whether a subagent has returned.",
    },
    {
      invariantKind: "absence",
      statement: "How long a process has run is not read here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here signals or ends a process.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A subagent's page may outlive its subagent by as long as the process does, so the page cannot say.",
    },
  ],
} as const satisfies Module
