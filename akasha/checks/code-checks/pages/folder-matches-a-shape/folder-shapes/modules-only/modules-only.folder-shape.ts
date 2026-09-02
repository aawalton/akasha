import type { FolderShape } from "../folder-shape.page-type.ts"

export const modulesOnly = {
  id: "01a05f26-edf0-76fc-b2f1-9351eb172aee",
  pageTypeSlug: "folder-shape",
  slug: "modules-only",
  definition: "the shape of a folder named modules holding folders and no file of its own",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named `modules`.",
    },
    {
      invariantKind: "departure",
      statement: "A module carries files of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Each module has a folder to itself.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding any file of its own is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a subfolder holds a module is judged where that subfolder is judged.",
    },
  ],
} as const satisfies FolderShape
