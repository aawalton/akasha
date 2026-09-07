import type { ChangeChecked } from "../../../checked/change-checked.page-type.ts"

export const removePageType = {
  id: "01a0783a-11c0-7891-a250-63a80bef1c95",
  pageTypeSlug: "change-checked",
  slug: "remove-page-type",
  changeModeSlug: "change-mode-remove",
  definition: "one page type taken away, by the partial change taking a page type away",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The kind of page is read from the path rather than from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A path the naming grammar reads as no page file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page that is no page type is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal for a page that is no page type names the change taking a page away.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is handed to the partial change taking a page type away.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
} as const satisfies ChangeChecked
