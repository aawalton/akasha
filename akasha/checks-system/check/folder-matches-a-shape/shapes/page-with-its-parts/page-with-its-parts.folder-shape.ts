import type { FolderShape } from "../folder-shape.page-type.ts"

export const pageWithItsParts = {
  id: "01a04e33-f281-7a77-8901-c9954673963d",
  pageTypeSlug: "folder-shape",
  slug: "page-with-its-parts",
  definition:
    "the shape of a folder named for the page it holds, beside the modules that page is made of",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The folder is named for the page it holds, so which page is the headline is read off the folder rather than off any page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only a module may stand beside the headline page. A second page of any other type is a folder that should have been two.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no file at all takes this shape rather than failing it.",
    },
  ],
} as const satisfies FolderShape
