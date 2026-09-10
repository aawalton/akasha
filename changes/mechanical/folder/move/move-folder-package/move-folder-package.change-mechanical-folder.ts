import type { ChangeMechanicalFolder } from "../../change-mechanical-folder.page-type.types.ts"

export const moveFolderPackage = {
  id: "01a08240-de06-760d-bf8c-d82a5881e24b",
  pageTypeSlug: "change-mechanical-folder",
  type: "change-mechanical-folder",
  slug: "move-folder-package",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder-package",
  definition: "a workspace package moved to another folder, taking the slug that folder names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page that is no workspace package is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The folder moved is the folder the package page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "The package takes the slug naming the folder the package lands in.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named for a page type's plural hands the package that page type's slug.",
    },
    {
      invariantKind: "departure",
      statement: "The page type read for that plural sits in the folder rather than beneath it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A package landing under the name the package has keeps the slug that package had.",
    },
    {
      invariantKind: "departure",
      statement: "The slug is restated over a world with every file that moved.",
    },
    {
      invariantKind: "absence",
      statement: "No file is moved beyond the ones the folder move moves.",
    },
    {
      invariantKind: "absence",
      statement: "No address is repointed beyond the ones the folder move repoints.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFolder
