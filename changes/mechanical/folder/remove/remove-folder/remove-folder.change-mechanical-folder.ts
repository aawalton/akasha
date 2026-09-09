import type { ChangeMechanicalFolder } from "../../change-mechanical-folder.page-type.ts"

export const removeFolder = {
  id: "01a08231-44a2-7e00-bd04-119872f58319",
  pageTypeSlug: "change-mechanical-folder",
  slug: "remove-folder",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder",
  definition: "one folder and every file under it taken away",
  code: "ts",
  test: "ts",
  guards: ["change-guard/relation-not-left-hanging", "change-guard/import-not-left-hanging"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every file under the folder goes whether or not the index names it.",
    },
    {
      invariantKind: "absence",
      statement: "No file outside the folder goes.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with no file is taken away as one path rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "One call of `remove-file` takes each file away.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal from `remove-file` refuses the whole removal.",
    },
    {
      invariantKind: "absence",
      statement: "No body outside the folder is rewritten here.",
    },
    {
      invariantKind: "departure",
      statement: "A name into the folder left hanging is refused by a guard this change names.",
    },
  ],
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanicalFolder
