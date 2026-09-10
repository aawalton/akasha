import type { FolderShape } from "../folder-shape.page-type.types.ts"

export const sectionsOfTheSectionBeside = {
  id: "01a08b84-cae8-7fb3-9317-790b3e13db13",
  pageTypeSlug: "folder-shape",
  type: "folder-shape",
  slug: "sections-of-the-section-beside",
  definition: "the shape of a folder with the sections of the section sitting beside it",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is named for a section sitting beside the folder.",
    },
    {
      invariantKind: "departure",
      statement: "A book Alan writes is somewhere above the folder.",
    },
    {
      invariantKind: "departure",
      statement: "Every folder between is looked through to find that book.",
    },
    {
      invariantKind: "departure",
      statement: "Every page in the folder is a book section.",
    },
    {
      invariantKind: "departure",
      statement: "Every section in the folder names the section the folder is named for.",
    },
    {
      invariantKind: "departure",
      statement: "That name is an address of the page type, then the book, then the section.",
    },
    {
      invariantKind: "departure",
      statement: "A section has its prose in a file beside the section rather than in a folder.",
    },
    {
      invariantKind: "departure",
      statement: "The folder has no file that is neither a section nor a file beside a section.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named for a section with no section is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder inside has the sections one section of this book is made of.",
    },
  ],
} as const satisfies FolderShape
