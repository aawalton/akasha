import type { ChangeMechanicalFolder } from "akasha/change/mechanical/folder/change-mechanical-folder.page-type.types.ts"

export const unlistPagesUnder = {
  id: "01a17ed1-d4ea-7836-9c21-0006b8e257fa",
  type: "page-type/change-mechanical-folder",
  slug: "unlist-pages-under",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder",
  definition: "every list outside a folder that names a page under it, without that name",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages naming a page under the folder are read off the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page under the folder is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is taken out of a list a page states, or a list in a record of one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name stated alone rather than in a list is left for the checks to name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding no page is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No change is reached here.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
  createdAt: "2026-10-27T19:24:03.177Z",
  updatedAt: "2026-10-27T19:24:03.177Z",
} as const satisfies ChangeMechanicalFolder
