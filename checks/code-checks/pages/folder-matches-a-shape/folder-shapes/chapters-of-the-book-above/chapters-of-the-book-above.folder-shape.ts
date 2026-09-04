import type { FolderShape } from "../folder-shape.page-type.ts"

export const chaptersOfTheBookAbove = {
  id: "01a06d79-1d8e-7531-86b1-1116c2aff36f",
  pageTypeSlug: "folder-shape",
  slug: "chapters-of-the-book-above",
  definition: "the shape of a folder named chapters holding the chapters of the book above it",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named `chapters`.",
    },
    {
      invariantKind: "departure",
      statement: "The folder above holds one book Alan writes.",
    },
    {
      invariantKind: "departure",
      statement: "Every page in the folder is a book chapter.",
    },
    {
      invariantKind: "departure",
      statement: "Every chapter in the folder names the book above as what holds that chapter.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter carries its prose in a file beside the chapter rather than in a folder.",
    },
    {
      invariantKind: "departure",
      statement: "The folder holds no folder of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The folder holds no file that is neither a chapter nor a file beside one.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named `chapters` holding no chapter is refused.",
    },
    {
      invariantKind: "gap",
      statement: "A chapter filed under a folder inside `chapters` is refused by this shape.",
    },
  ],
} as const satisfies FolderShape
