import type { FolderShape } from "../folder-shape.page-type.ts"

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
      statement: "The folder is the one every other folder in the workspace sits under.",
    },
    {
      invariantKind: "departure",
      statement: "No folder inside the workspace takes this shape.",
    },
    {
      invariantKind: "departure",
      statement: "Each folder the root is allowed is added on its own.",
    },
    {
      invariantKind: "stopgap",
      statement: "No file sitting in the root is allowed yet.",
    },
    {
      invariantKind: "stopgap",
      statement: "The folders the root may have are named one at a time rather than by a rule.",
    },
    {
      invariantKind: "gap",
      statement: "A rule says which folders the root may hold.",
    },
  ],
} as const satisfies FolderShape
