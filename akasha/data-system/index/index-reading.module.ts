import type { Module } from "../../code-system/module/module.page-type.ts"

export const indexReading = {
  id: "01a04bdd-596c-7b76-9978-92ebfa6a20e4",
  pageTypeSlug: "module",
  slug: "index-reading",
  definition: "the answers the index gives back, each one a file read",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "departure",
      statement: "An answer is one file read or one directory listed, and never a walk.",
    },
    {
      invariantKind: "departure",
      statement:
        "A directory listed is one page type's own, and grows with that type and not with the corpus.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index names is answered as a path, never as the entry.",
    },
  ],
} as const satisfies Module
