import type { ChangeMechanicalFolder } from "../../change-mechanical-folder.page-type.ts"

export const removeFolderPackage = {
  id: "01a0824a-d2c6-7488-8bfd-742aa19c8ef2",
  pageTypeSlug: "change-mechanical-folder",
  slug: "remove-folder-package",
  changeModeSlug: "change-mode-remove",
  changeTargetTypeSlug: "change-target-type/folder",
  changeTargetSubtypeSlug: "change-target-subtype/folder-package",
  definition: "one workspace package taken away with the folder that package sits in",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page that is no workspace package is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The folder taken away is the folder the package page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "The removal is worked out by the change this change reaches.",
    },
    {
      invariantKind: "gap",
      statement: "The workspace naming the package among its folders drops that name.",
    },
    {
      invariantKind: "gap",
      statement: "A manifest reaching the package by its name is judged before the folder goes.",
    },
  ],
} as const satisfies ChangeMechanicalFolder
