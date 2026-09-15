import type { FolderShape } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.types.ts"

export const sectionsOfTheBookAbove = {
  id: "01a06d79-1d8e-7531-86b1-1116c2aff36f",
  type: "folder-shape",
  slug: "sections-of-the-book-above",
  definition: "the shape of a folder named sections with the sections of the book above it",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder is named `sections`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder above has one book Alan writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page in the folder is a book section.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every section in the folder names the book above as the collection holding that section.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A section names the book above by that book's page type and slug together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A section has its prose in a file beside the section rather than in a folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder inside has the sections one section of this book is made of.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder has no file that is neither a section nor a file beside a section.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder named `sections` with no section is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder inside is judged by the shape for the sections of a section.",
    },
  ],
} as const satisfies FolderShape
