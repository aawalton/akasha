import type { ChangeMechanical } from "../../change-mechanical.page-type.ts"

export const removePageFile = {
  id: "01a079a5-8d4a-70e6-a33b-73d49d514b05",
  pageTypeSlug: "change-mechanical",
  slug: "remove-page-file",
  definition: "one page file taken away, with the relations and the files beside that page judged",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  guardSlugs: [
    "change-guard/relation-not-left-hanging",
    "change-guard/claimed-file-not-left-behind",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under no page name is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a name is read against are the ones the world files.",
    },
    {
      invariantKind: "departure",
      statement: "The file is taken away by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The relations naming the page are judged by a guard this change names.",
    },
    {
      invariantKind: "departure",
      statement: "The files beside the page are judged by a guard this change names.",
    },
  ],
} as const satisfies ChangeMechanical
