import type { FolderShape } from "../folder-shape.page-type.ts"

export const pagesOfOneType = {
  id: "01a04e33-f281-74c8-b82a-e4d314424e1d",
  pageTypeSlug: "folder-shape",
  slug: "pages-of-one-type",
  definition: "the shape of a folder holding pages of one page type and nothing else",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A file standing beside a page is not a page: a folder holding one takes some other shape than this.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder is judged by the page types of the pages sitting in it. That is what the folder groups rather than what any page type says of itself.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no file at all takes this shape rather than failing it.",
    },
  ],
} as const satisfies FolderShape
