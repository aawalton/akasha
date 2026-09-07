import type { ChangeMechanical } from "../../change-mechanical.page-type.ts"

export const addPageTypeFile = {
  id: "01a07984-8ef3-719a-972b-cb77ca7dafec",
  pageTypeSlug: "change-mechanical",
  slug: "add-page-type-file",
  changeModeSlug: "change-mode-add",
  definition:
    "one page type written at one path, with the plural slug that page type states judged",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  guardSlugs: ["change-guard/plural-slug-not-already-held"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path under no `page-type` name is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a name is read against are the ones the world files.",
    },
    {
      invariantKind: "departure",
      statement: "The body is written by the change this change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The plural slug the body states is judged by the guard this change names.",
    },
  ],
} as const satisfies ChangeMechanical
