import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bookSections = {
  id: "01a09ec3-da54-7a58-9554-ea6fd937fd5f",
  type: "module",
  slug: "book-sections",
  definition: "how a folder of book sections is judged, whatever the sections name as holding them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page in the folder is of the `book-section` page type.",
    },
    {
      invariantKind: "departure",
      statement: "Every section names what holds them as holding it.",
    },
    {
      invariantKind: "departure",
      statement: "What holds them is handed in rather than worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is neither a section nor a file beside one is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside no section in this folder is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no section at all is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the page above the folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the name of the folder it judges.",
    },
  ],
} as const satisfies Module
