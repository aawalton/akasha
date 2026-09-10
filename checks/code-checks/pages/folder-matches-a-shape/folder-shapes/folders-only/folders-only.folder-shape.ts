import type { FolderShape } from "../folder-shape.page-type.types.ts"

export const foldersOnly = {
  id: "01a05ddc-a691-7000-b09f-a0f72c44e7ff",
  pageTypeSlug: "folder-shape",
  type: "folder-shape",
  slug: "folders-only",
  definition: "the shape of a folder holding folders and no file of its own",
  code: "ts",
  test: "ts",
  enabled: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder with no file of its own takes this shape.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with any file of its own fails this shape.",
    },
    {
      invariantKind: "absence",
      statement:
        "The paths the folders beneath that folder have are judged where those folders are judged.",
    },
    {
      invariantKind: "gap",
      statement: "A folder holding only folders is judged by which folders the folder has.",
    },
    {
      invariantKind: "gap",
      statement: "The akasha folder is judged by a shape of its own rather than by this shape.",
    },
  ],
} as const satisfies FolderShape
