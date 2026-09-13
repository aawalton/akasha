import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const oneTypeOnly = {
  id: "01a09c36-f538-72e2-9125-1f0b39671fa5",
  type: "module",
  slug: "one-type-only",
  definition: "how a folder of page folders of one type is judged",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page type the folders hold is handed in rather than written here.",
    },
    {
      invariantKind: "departure",
      statement: "The words a refusal is said in are handed in with that page type.",
    },
    {
      invariantKind: "departure",
      statement: "Each page has a folder to itself.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with any file of its own is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Every page in the folder is a part the page above declares.",
    },
    {
      invariantKind: "departure",
      statement: "A folder above holding no page is asked for no part.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the name of the folder it judges.",
    },
  ],
} as const satisfies Module
