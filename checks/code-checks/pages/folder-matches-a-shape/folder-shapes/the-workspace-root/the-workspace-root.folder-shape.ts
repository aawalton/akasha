import type { FolderShape } from "../folder-shape.page-type.types.ts"

export const theWorkspaceRoot = {
  id: "01a08261-3b06-764b-9a0d-e073c9504692",
  pageTypeSlug: "folder-shape",
  type: "folder-shape",
  slug: "the-workspace-root",
  definition: "the shape of the folder every other folder in the workspace sits under",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is the folder every other folder in the workspace sits under.",
    },
    {
      invariantKind: "departure",
      statement: "No folder inside the workspace takes this shape.",
    },
    {
      invariantKind: "departure",
      statement: "The folder has two pages.",
    },
    {
      invariantKind: "departure",
      statement: "The two pages are a workspace and the domain over the whole tree.",
    },
    {
      invariantKind: "departure",
      statement: "Every file in the folder is a part one of those two pages states.",
    },
    {
      invariantKind: "departure",
      statement: "The files a workspace holds are the ones its own file properties land on.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder with a page the domain declares a part is a part too.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder with no page the domain declares is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder a file either page's own property names sits under is a part too.",
    },
  ],
} as const satisfies FolderShape
