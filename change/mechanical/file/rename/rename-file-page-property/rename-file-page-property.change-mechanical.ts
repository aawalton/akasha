import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const renameFilePageProperty = {
  id: "01a08249-eea4-7473-8095-9de50cef8477",
  type: "page-type/change-mechanical",
  slug: "rename-file-page-property",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-property",
  definition: "a page property renamed and carried to where its slug says",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rename is worked out by the change this change reaches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges the path handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here spells the key anew wherever a page has that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`rename-page-property-property-slug` spells that key anew on every such page.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
