import type { FolderShape } from "../folder-shape.page-type.types.ts"

export const sectionsOfTheBookAbove = {
  id: "01a06d79-1d8e-7531-86b1-1116c2aff36f",
  pageTypeSlug: "folder-shape",
  type: "folder-shape",
  slug: "sections-of-the-book-above",
  definition: "the shape of a folder named sections with the sections of the book above it",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named `sections`.",
    },
    {
      invariantKind: "departure",
      statement: "The folder above has one book Alan writes.",
    },
    {
      invariantKind: "departure",
      statement: "Every page in the folder is a book section.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every section in the folder names the book above as the collection holding that section.",
    },
    {
      invariantKind: "departure",
      statement: "A section has its prose in a file beside the section rather than in a folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder inside has the sections one section of this book is made of.",
    },
    {
      invariantKind: "departure",
      statement: "The folder has no file that is neither a section nor a file beside a section.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named `sections` with no section is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder inside is judged by the shape for the sections of a section.",
    },
  ],
} as const satisfies FolderShape
