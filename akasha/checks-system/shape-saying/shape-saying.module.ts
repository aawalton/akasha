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
      statement:
        "A file is said by its name inside the folder, because the folder is already named in the refusal and saying it twice reads as noise.",
    },
    {
      invariantKind: "departure",
      statement:
        "Files are said in the order the shape found them, so what a reader goes looking for first is what the shape looked at first.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shape may cap how many it says, and what is left is counted rather than dropped, so a refusal never reads as though it named them all.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file arrives as a path or as a page the index knows, because a shape is handed both and neither is worth adapting at the call.",
    },
  ],
} as const satisfies Module
