import type { ChangeChecked } from "../../change-checked.page-type.ts"

export const removePage = {
  id: "01a0776d-8d1e-7f93-a0e2-4c566d49f8fd",
  pageTypeSlug: "change-checked",
  slug: "remove-page",
  changeModeSlug: "change-mode-remove",
  definition: "one page taken away, by the partial change fitting the kind of page named",
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
      statement: "A page type is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal for a page type names the change that takes a page type away.",
    },
    {
      invariantKind: "departure",
      statement: "A page that is no page type is handed to the partial change taking a page away.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "gap",
      statement: "A page property goes through the partial for an ordinary page.",
    },
  ],
} as const satisfies ChangeChecked
