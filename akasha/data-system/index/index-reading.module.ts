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
    "An answer is one file read or one directory listed, and never a walk.",
    "A directory listed is one page type's own, so it grows with that type and not with the corpus.",
    "A page the index names is answered as a path, because a reader wants the file and not the entry.",
  ],
} as const satisfies Module
