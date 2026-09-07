import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const changePageProperty = {
  id: "01a07716-76a6-7428-9e18-f3fc32d18085",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "change-page-property",
  changeModeSlug: "change-mode-change",
  changeTargetTypeSlug: "change-target-type/file-content",
  changeTargetSubtypeSlug: "change-target-subtype/page-property-prose",
  definition: "one key of a page's exported object stated anew",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body is answered whole each side rather than as the passage under that key.",
    },
    {
      invariantKind: "departure",
      statement: "A body holds the text a key states in other places as well.",
    },
  ],
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeMechanicalFileContent
