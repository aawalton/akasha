import type { ChangeMechanicalFile } from "../../change-mechanical-file.page-type.ts"

export const addFilePageType = {
  id: "01a07984-8ef3-719a-972b-cb77ca7dafec",
  pageTypeSlug: "change-mechanical-file",
  slug: "add-file-page-type",
  changeModeSlug: "change-mode-add",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file-page-type",
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
} as const satisfies ChangeMechanicalFile
