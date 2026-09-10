import type { ChangeMechanical } from "../../../change-mechanical.page-type.types.ts"

export const renameFilePageProperty = {
  id: "01a08249-eea4-7473-8095-9de50cef8477",
  pageTypeSlug: "change-mechanical",
  type: "change-mechanical",
  slug: "rename-file-page-property",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-property",
  definition: "one page property renamed and carried to where its slug says",
  code: "ts",
  test: "ts",
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
      invariantKind: "absence",
      statement: "Nothing here spells the key anew wherever a page has that key.",
    },
    {
      invariantKind: "departure",
      statement: "`rename-page-property-property-slug` spells that key anew on every such page.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
