import type { ChangeMechanicalFolder } from "akasha/change/mechanical/folder/change-mechanical-folder.page-type.types.ts"

export const removeFolder = {
  id: "01a08231-44a2-7e00-bd04-119872f58319",
  type: "page-type/change-mechanical-folder",
  slug: "remove-folder",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder",
  definition: "a folder and every file under it taken away",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file under the folder goes whether or not the index names it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No file outside the folder goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder with no file is taken away as one path rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One answer states the removal of every file under the folder.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No change is reached here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No body outside the folder is rewritten here.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFolder
