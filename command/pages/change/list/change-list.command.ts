import type { Command } from "akasha/command/command.page-type.types.ts"

export const changeList = {
  id: "01a0816b-f0ae-7c9a-88cc-25ed0222c61f",
  type: "page-type/command",
  slug: "change-list",
  definition: "the command naming the edits an agent keeps and has not landed",
  code: "ts",
  test: "ts",

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A list names the edits kept beside this agent's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edit is said the way every act over the edits kept says an edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The edits are named in the order a name sorts rather than the order kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word on the command line other than the help flag is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag other than the help flag is refused as any other word is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The help flag is answered with what a list names and what a list takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent keeping no edits is said rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A list takes nothing piped in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A list writes nothing.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "The help flag reaches this command's own help rather than the namespace's.",
    },
  ],
  name: "list",
  arguments: [],
} as const satisfies Command
