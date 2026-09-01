import type { FolderShape } from "../folder-shape.page-type.ts"

export const foldersOnly = {
  id: "01a05ddc-a691-7000-b09f-a0f72c44e7ff",
  pageTypeSlug: "folder-shape",
  slug: "folders-only",
  definition: "the shape of a folder holding folders and no file of its own",
  code: "ts",
  test: "ts",
  enabled: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder holding no file of its own takes this shape.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding any file of its own fails this shape.",
    },
    {
      invariantKind: "absence",
      statement: "What the folders beneath it hold is judged where each of them is judged.",
    },
    {
      invariantKind: "gap",
      statement: "A folder holding only folders is judged by which folders the folder holds.",
    },
    {
      invariantKind: "gap",
      statement: "The akasha folder is judged by a shape of its own rather than by this one.",
    },
  ],
} as const satisfies FolderShape
