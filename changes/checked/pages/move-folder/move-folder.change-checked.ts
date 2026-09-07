import type { ChangeChecked } from "../../change-checked.page-type.ts"

export const moveFolder = {
  id: "01a07c54-a9b0-797b-add8-8e9d734c5213",
  pageTypeSlug: "change-checked",
  slug: "move-folder",
  changeModeSlug: "change-mode-move",
  definition: "one folder and every file under it carried to another path",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every file under the folder is carried.",
    },
    {
      invariantKind: "departure",
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
      statement: "A folder already holding a body at a path the move would write is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page carried with the folder keeps the slug that page had.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here changes the data a page states.",
    },
  ],
} as const satisfies ChangeChecked
