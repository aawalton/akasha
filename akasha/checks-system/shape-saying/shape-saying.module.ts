import type { Module } from "../../code-system/module/module.page-type.ts"

export const shapeSaying = {
  id: "01a04f44-705b-70b6-8537-9f2a66b2b56a",
  pageTypeSlug: "module",
  slug: "shape-saying",
  definition: "the files a shape means, said by the names they carry inside the folder it judges",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file is said by its name inside the folder.",
    },
    {
      invariantKind: "departure",
      statement: "Files are said in the order the shape found them.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shape may cap how many it says, and what is left is counted rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A file arrives as a path or as a page the index knows.",
    },
  ],
} as const satisfies Module
