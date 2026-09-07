import type { ChangeChecked } from "../../change-checked.page-type.ts"

export const removeFile = {
  id: "01a07991-8989-7000-8e13-06e6791ebefb",
  pageTypeSlug: "change-checked",
  slug: "remove-file",
  changeModeSlug: "change-mode-remove",
  definition: "one file taken away, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page file is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal for a page file names the change that takes a page away.",
    },
    {
      invariantKind: "departure",
      statement: "A page file is read from the path against the page types the index holds.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming a page type that is no page type is no page file.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is no page file is handed to the change taking a file away.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "No file beside the path is taken away here.",
    },
  ],
} as const satisfies ChangeChecked
