import type { FolderShape } from "../folder-shape.page-type.ts"

export const onePageWithItsProperties = {
  id: "01a04e33-f281-70c7-9469-ffdb23becd61",
  pageTypeSlug: "folder-shape",
  slug: "one-page-with-its-properties",
  definition: "the shape of a folder holding one page and the files standing beside it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A file standing beside a page answers which page it stands beside, so a file whose page is elsewhere fails here rather than passing unnoticed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subfolder is a folder of its own, so a folder taking this shape may still hold folders under it.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no file at all takes this shape rather than failing it.",
    },
  ],
} as const satisfies FolderShape
