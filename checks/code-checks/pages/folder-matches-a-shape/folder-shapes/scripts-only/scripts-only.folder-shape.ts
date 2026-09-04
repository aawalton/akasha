import type { FolderShape } from "../folder-shape.page-type.ts"

export const scriptsOnly = {
  id: "01a063e4-5f38-7000-a16b-d956278882ec",
  pageTypeSlug: "folder-shape",
  slug: "scripts-only",
  definition:
    "the shape of a folder named scripts holding a folder for each script and nothing else",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named `scripts`.",
    },
    {
      invariantKind: "departure",
      statement: "A script carries a file of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Each script has a folder to itself.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding any file of its own is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every subfolder holds a page of the `shell-script` page type.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder holding any other page is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A subfolder holding no page is refused too.",
    },
    {
      invariantKind: "absence",
      statement: "What else a script's own folder holds is judged where that folder is judged.",
    },
  ],
} as const satisfies FolderShape
