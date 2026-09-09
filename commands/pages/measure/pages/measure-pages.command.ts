import type { Command } from "../../../command.page-type.ts"

export const measurePages = {
  id: "01a0796e-60c4-70a1-bcfe-f3dffb873f7e",
  pageTypeSlug: "command",
  type: "command",
  slug: "measure-pages",
  definition: "the command counting the checkout's files by page type rather than by file type",
  code: "ts",
  changeKind: "change-mechanical",
  parts: ["module/page-measuring"],
  taking: [],
  helpNotes: [
    "a page type is the second part of a file name, so `amy.persona.ts` is a `persona` page.",
    "the pages of a page type and the property files beside them are counted apart.",
    "a file naming a page type nothing declares is counted under no page type.",
    "a secret beside a page is no property, so a `sops` file sits outside the page types.",
    "how many files are no page at all is said beneath the total.",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
  ],
} as const satisfies Command
