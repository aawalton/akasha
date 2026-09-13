import type { Command } from "akasha/commands/command.page-type.types.ts"

export const agentSubagentStop = {
  id: "01a09c5f-3b45-7a00-b0e7-238c94f217aa",
  type: "command",
  slug: "agent-subagent-stop",
  definition: "the command stopping a subagent by refusing the model turns that subagent asks for",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The subagent stopped is named by the first word.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent to stop is named as that subagent's page is named.",
    },
    {
      invariantKind: "departure",
      statement: "A name no subagent has a page for is refused as data.",
    },
    {
      invariantKind: "departure",
      statement: "A stop is written beside the subagent's page rather than into that page.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent stopped already is left as it is, and the run says so.",
    },
    {
      invariantKind: "departure",
      statement: "The report says when the stop reaches the subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A stop reaches the subagent at its next model turn.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent inside a tool call finishes that call before the stop reaches it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here ends a process.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes the subagent's page away.",
    },
    {
      invariantKind: "departure",
      statement: "The page goes as the gateway refuses the turn that stop ends the subagent on.",
    },
  ],
  name: "subagent-stop",
  arguments: [{ argument: "argument/subagent", required: true, saidAs: "word" }],
} as const satisfies Command
