import type { ChangeMechanical } from "../../../change-mechanical.page-type.types.ts"

export const renameFilePages = {
  id: "01a08335-76fe-7381-bcda-07d2b9c0f3d3",
  pageTypeSlug: "change-mechanical",
  type: "change-mechanical",
  slug: "rename-file-pages",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "many pages renamed over one reading of the bodies naming them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every address handed in is restated over one reading of the bodies.",
    },
    {
      invariantKind: "departure",
      statement: "That restating comes before any page is renamed.",
    },
    {
      invariantKind: "departure",
      statement: "Each page's own rename is left to the change renaming one page.",
    },
    {
      invariantKind: "departure",
      statement: "That change is told the addresses are restated already.",
    },
    {
      invariantKind: "departure",
      statement: "A page handed in under the slug that page carries has no address restated.",
    },
    {
      invariantKind: "departure",
      statement: "A page's slug and page type are read from that page's body rather than its name.",
    },
    {
      invariantKind: "departure",
      statement: "A body that cannot be read refuses the whole answer.",
    },
    {
      invariantKind: "departure",
      statement: "A call handing in no page is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The first refusal answers for the whole call.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
