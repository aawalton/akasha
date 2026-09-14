import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const strayProcess = {
  id: "01a09cd4-c1f0-776c-825d-f33fe4f0576c",
  type: "module",
  slug: "stray-process",
  definition: "a process still running under a subagent that has departed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A process is a stray where no page carries its subagent and the transcript says returned.",
    },
    {
      invariantKind: "departure",
      statement: "A process is a stray where the index carries no page for its subagent's seat.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent one signal calls returned and another calls present is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A process whose subagent a page still carries is no stray.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the seat has a page is read before the transcript is.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the subagent has a page is read before the transcript is.",
    },
    {
      invariantKind: "departure",
      statement: "An index that would not answer leaves the subagent unread rather than gone.",
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
      statement: "No page's body is read to tell whether a subagent has returned.",
    },
    {
      invariantKind: "constraint",
      statement:
        "An index read as carrying no page where it would not answer would make every seat look gone.",
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
        "A subagent's page may outlive its subagent, so a page still there cannot say on its own.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A transcript may name nowhere a subagent that is working, so the transcript cannot say alone.",
    },
  ],
} as const satisfies Module
