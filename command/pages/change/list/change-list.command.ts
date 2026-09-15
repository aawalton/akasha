import type { Command } from "akasha/command/command.page-type.types.ts"

export const changeList = {
  id: "01a0816b-f0ae-7c9a-88cc-25ed0222c61f",
  type: "page-type/command",
  slug: "change-list",
  definition: "the command naming the edits an agent keeps and has not landed",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A list names the edits kept beside this agent's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An edit is said the way every act over the edits kept says an edit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The edits are named in the order a name sorts rather than the order kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word on the command line other than the help flag is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag other than the help flag is refused as any other word is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The help flag is answered with what a list names and what a list takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent keeping no edits is said rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A list takes nothing piped in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A list writes nothing.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "The help flag reaches this command's own help rather than the namespace's.",
    },
  ],
  name: "list",
  arguments: [],
} as const satisfies Command
