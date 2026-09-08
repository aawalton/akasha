import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const addPageProperty = {
  id: "01a08174-b09a-7bbd-acf1-6892ecfb3575",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "add-page-property",
  changeModeSlug: "change-mode-add",
  changeTargetTypeSlug: "change-target-type/file-content",
  changeTargetSubtypeSlug: "change-target-subtype/file-content-page-property-value",
  definition: "one key put into a page's body under one value rather than under a list",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key the page states already is refused rather than stated anew.",
    },
    {
      invariantKind: "departure",
      statement: "The value is written as one value rather than as a list of one.",
    },
    {
      invariantKind: "departure",
      statement: "The key is written after the property `after` names.",
    },
    {
      invariantKind: "departure",
      statement: "The key is written last where `after` names no such property.",
    },
    {
      invariantKind: "departure",
      statement: "The key is written last where no `after` is stated.",
    },
    {
      invariantKind: "departure",
      statement: "A body exporting no object is refused rather than gaining a key.",
    },
    {
      invariantKind: "departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
} as const satisfies ChangeMechanicalFileContent
