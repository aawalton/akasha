import type { ChangeMechanicalFolder } from "../../change-mechanical-folder.page-type.ts"

export const moveFolderPackage = {
  id: "01a08240-de06-760d-bf8c-d82a5881e24b",
  pageTypeSlug: "change-mechanical-folder",
  slug: "move-folder-package",
  changeModeSlug: "change-mode-move",
  changeTargetTypeSlug: "change-target-type/folder",
  changeTargetSubtypeSlug: "change-target-subtype/folder-package",
  definition: "a workspace package carried to another folder, taking the slug that folder names",
  code: "ts",
  test: "ts",
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page that is no workspace package is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The folder carried is the folder the package page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "The package takes the slug naming the folder the package lands in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package landing under the name the package carries keeps the slug that package had.",
    },
    {
      invariantKind: "departure",
      statement: "The slug is restated over a world holding every file that moved.",
    },
    {
      invariantKind: "absence",
      statement: "No file is carried beyond the ones the folder move carries.",
    },
    {
      invariantKind: "absence",
      statement: "No address is repointed beyond the ones the folder move repoints.",
    },
  ],
  changeKindSlug: "change-mechanical",
} as const satisfies ChangeMechanicalFolder
