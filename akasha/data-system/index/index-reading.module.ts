import type { Module } from "../../code-system/module/module.page-type.ts"

export const indexReading = {
  id: "01a04bdd-596c-7b76-9978-92ebfa6a20e4",
  pageTypeSlug: "module",
  slug: "index-reading",
  definition: "the answers the index gives back, each one a file read",
  code: "ts",
  test: "ts",
  design: [
    {
      invariantKind: "departure",
      statement:
        "An answer about one page is one file read or one directory listed, and never a walk.",
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
    {
      invariantKind: "departure",
      statement:
        "Every path the index files is answered by walking the one tree those paths are filed in, the answer being the corpus itself, and nothing else here walks.",
    },
    {
      invariantKind: "departure",
      statement: "What imports a file is refused when the index does not describe HEAD.",
    },
    {
      invariantKind: "absence",
      statement: "An answer about one page reads no stamp.",
    },
  ],
} as const satisfies Module
