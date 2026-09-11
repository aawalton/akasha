import type { Command } from "akasha/commands/command.page-type.types.ts"

export const changeList = {
  id: "01a0816b-f0ae-7c9a-88cc-25ed0222c61f",
  pageTypeSlug: "command",
  type: "command",
  slug: "change-list",
  definition: "the edits an agent keeps and has not landed",
  code: "ts",
  test: "ts",
  changeKind: "change-authored",
  helpNotes: [
    "a list names the edits kept beside this agent's own page, and takes no word naming anything else.",
    "a list takes nothing piped in.",
    "a list changes nothing, so a list over the same edits twice says the same thing twice.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A list names the edits kept beside this agent's page.",
    },
    {
      invariantKind: "departure",
      statement: "An edit is said the way every act over the edits kept says an edit.",
    },
    {
      invariantKind: "departure",
      statement: "The edits are named in the order a name sorts rather than the order kept.",
    },
    {
      invariantKind: "departure",
      statement: "A word on the command line is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag is refused as any other word is.",
    },
    {
      invariantKind: "departure",
      statement: "An agent keeping no edits is said rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A list takes nothing piped in.",
    },
    {
      invariantKind: "absence",
      statement: "A list writes nothing.",
    },
    {
      invariantKind: "absence",
      statement: "No taking is stated here.",
    },
    {
      invariantKind: "departure",
      statement: "The help flag reaches this command's own help notes.",
    },
  ],
} as const satisfies Command
