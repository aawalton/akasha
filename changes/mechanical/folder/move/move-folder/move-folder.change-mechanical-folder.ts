import type { ChangeMechanicalFolder } from "../../change-mechanical-folder.page-type.ts"

export const moveFolder = {
  id: "01a0822c-5d57-7992-b533-fe3d7028ce8c",
  pageTypeSlug: "change-mechanical-folder",
  slug: "move-folder",
  changeModeSlug: "change-mode-move",
  changeTargetTypeSlug: "change-target-type/folder",
  changeTargetSubtypeSlug: "change-target-subtype/folder",
  definition: "one folder and every file under it carried to another path",
  code: "ts",
  test: "ts",
  readersOweReading: false,
  writerOwesReading: false,
  guardSlugs: [
    "change-guard/import-not-left-hanging",
    "change-guard/claimed-file-not-left-behind",
    "change-guard/folder-not-left-named",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every file under the folder is carried whether or not the index names it.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text is carried rather than refused.",
    },
    {
      invariantKind: "absence",
      statement: "No file outside the folder is carried.",
    },
    {
      invariantKind: "departure",
      statement: "A file keeps its place beneath the folder that file moved with.",
    },
    {
      invariantKind: "departure",
      statement: "A reach from one carried file to another is left as that reach is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body outside the folder naming a path that moved is repointed in the same answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body naming the folder rather than a whole path that moved is repointed by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body the carry writes still naming that folder refuses the carry.",
    },
    {
      invariantKind: "departure",
      statement: "A folder already with a body at a path the move would write is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with no file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder carried under itself is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page carried with the folder keeps the slug that page had.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the data a page states.",
    },
    {
      invariantKind: "departure",
      statement:
        "The imports, the pages' files and the folders emptied are judged by the guards here.",
    },
  ],
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanicalFolder
