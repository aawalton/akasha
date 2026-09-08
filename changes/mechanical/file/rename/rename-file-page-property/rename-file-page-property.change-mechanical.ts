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
      statement: "A path that is no page property is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The property types a name is read against are the ones under `page-property`.",
    },
    {
      invariantKind: "departure",
      statement: "The rename is worked out by the change this change reaches.",
    },
    {
      invariantKind: "gap",
      statement: "The key a renamed property declares is restated wherever a page carries it.",
    },
  ],
} as const satisfies ChangeMechanical
