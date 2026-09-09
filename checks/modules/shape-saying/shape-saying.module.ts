import type { Module } from "@akasha/code/module"

export const shapeSaying = {
  id: "01a04f44-705b-70b6-8537-9f2a66b2b56a",
  pageTypeSlug: "module",
  type: "module",
  slug: "shape-saying",
  definition: "the files a shape means, said by the names they carry inside the folder it judges",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Files are said in the order the shape found the files.",
    },
    {
      invariantKind: "departure",
      statement: "A shape may cap how many files that shape says.",
    },
    {
      invariantKind: "departure",
      statement: "The files left over are counted rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A file arrives as a path or as a page the index knows.",
    },
  ],
} as const satisfies Module
