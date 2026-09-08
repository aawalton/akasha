import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const renameFilePageProperty = {
  id: "01a08249-eea4-7473-8095-9de50cef8477",
  pageTypeSlug: "change-mechanical",
  slug: "rename-file-page-property",
  changeModeSlug: "change-mode-rename",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file-page-property",
  definition: "one page property renamed and carried to where its slug says",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rename is worked out by the change this change reaches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the path handed in.",
    },
    {
      invariantKind: "gap",
      statement: "The key a renamed property declares is restated wherever a page carries it.",
    },
  ],
} as const satisfies ChangeMechanical
