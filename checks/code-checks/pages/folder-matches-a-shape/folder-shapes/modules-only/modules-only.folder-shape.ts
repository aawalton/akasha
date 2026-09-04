import type { FolderShape } from "../folder-shape.page-type.ts"

export const modulesOnly = {
  id: "01a05f26-edf0-76fc-b2f1-9351eb172aee",
  pageTypeSlug: "folder-shape",
  slug: "modules-only",
  definition:
    "the shape of a folder named modules holding the module folders the page above declares",
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
      invariantKind: "departure",
      statement: "Every subfolder holds a module.",
    },
    {
      invariantKind: "departure",
      statement: "Every module in it is a part the page above declares.",
    },
    {
      invariantKind: "departure",
      statement: "A folder above holding no page is asked for no part.",
    },
    {
      invariantKind: "absence",
      statement: "What a module holds is judged where that module is judged.",
    },
  ],
} as const satisfies FolderShape
