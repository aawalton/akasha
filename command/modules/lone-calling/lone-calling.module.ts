import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loneCalling = {
  id: "01a0d949-2a6c-79b8-91ec-e386aba092c8",
  type: "page-type/module",
  slug: "lone-calling",
  definition: "whether an agent's akasha call is the whole command that agent's shell was handed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A call to `akasha read` or `akasha change` is judged, and no other call is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call is judged only where it acts for an agent.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A read or a change acting for no agent is refused by the command itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A help call is not judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call whose output or errors do not reach the agent is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The command an agent's shell was handed is read off that shell's command line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line the harness puts first, naming the agent the call acts as, is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call started by anything but that shell is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call other than that whole command, in a form the combined-calls hook approves, is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal quotes the command the shell was handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call the akasha dispatcher started while running a change was judged with that change.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A short heredoc reaches standard input as a pipe, and a long one as a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Standard input is not judged, and a pipe into a call is refused as part of the command.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A shell built to look like an agent's own shell is told apart from that shell.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a page.",
    },
  ],
} as const satisfies Module
