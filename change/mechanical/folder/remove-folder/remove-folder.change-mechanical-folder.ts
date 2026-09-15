import type { ChangeMechanicalFolder } from "akasha/change/mechanical/folder/change-mechanical-folder.page-type.types.ts"

export const removeFolder = {
  id: "01a08231-44a2-7e00-bd04-119872f58319",
  type: "change-mechanical-folder",
  slug: "remove-folder",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder",
  definition: "one folder and every file under it taken away",
  code: "ts",
  test: "ts",
  guards: ["change-guard/relation-not-left-hanging", "change-guard/import-not-left-hanging"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file under the folder goes whether or not the index names it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No file outside the folder goes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder with no file is taken away as one path rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One answer states the removal of every file under the folder.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No change is reached here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No body outside the folder is rewritten here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name into the folder left hanging is refused by a guard this change names.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFolder
