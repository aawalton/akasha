import type { FolderShape } from "../folder-shape.page-type.types.ts"

export const modulesOnly = {
  id: "01a05f26-edf0-76fc-b2f1-9351eb172aee",
  pageTypeSlug: "folder-shape",
  type: "folder-shape",
  slug: "modules-only",
  definition: "the shape of a folder named modules with the module folders the page above declares",
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
      statement: "Each module has a folder to itself.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with any file of its own is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every subfolder has a module.",
    },
    {
      invariantKind: "departure",
      statement: "Every module in that folder is a part the page above declares.",
    },
    {
      invariantKind: "departure",
      statement: "A folder above holding no page is asked for no part.",
    },
    {
      invariantKind: "absence",
      statement: "The files a module holds are judged where that module is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder holding a second page is the folder of no module.",
    },
  ],
} as const satisfies FolderShape
