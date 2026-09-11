import type { FolderShape } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.types.ts"

export const aServiceWorkstationWithItsParts = {
  id: "01a076ab-4c17-7626-ad38-f06b550b24e2",
  pageTypeSlug: "folder-shape",
  type: "folder-shape",
  slug: "a-service-workstation-with-its-parts",
  definition: "the shape of a folder named service-workstations with one service with its parts",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named `service-workstations`.",
    },
    {
      invariantKind: "departure",
      statement: "The folder has one page.",
    },
    {
      invariantKind: "departure",
      statement: "That page is of the `service-workstation` page type.",
    },
    {
      invariantKind: "departure",
      statement: "Every other file in the folder is a part of that page.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with a subfolder is refused.",
    },
  ],
} as const satisfies FolderShape
