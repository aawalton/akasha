import type { Command } from "akasha/commands/command.page-type.types.ts"

export const measurePage = {
  id: "01a0796e-60c4-70a1-bcfe-f3dffb873f7e",
  type: "command",
  slug: "measure-page",
  definition: "the command counting the checkout's files by page type rather than by file type",
  code: "ts",
  parts: ["module/page-measuring"],
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type is the second part of a file name.",
    },
    {
      invariantKind: "departure",
      statement: "The pages of a page type and the property files beside them are counted apart.",
    },
    {
      invariantKind: "departure",
      statement: "A file naming a page type nothing declares is counted under no page type.",
    },
    {
      invariantKind: "departure",
      statement: "A secret beside a page is no property file.",
    },
    {
      invariantKind: "departure",
      statement: "How many files are no page at all is said beneath the total.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
  ],
  name: "page",
} as const satisfies Command
