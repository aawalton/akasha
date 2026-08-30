import type { Module } from "../../../code-system/module/module.page-type.ts"

export const indexReading = {
  id: "01a04bdd-596c-7b76-9978-92ebfa6a20e4",
  pageTypeSlug: "module",
  slug: "index-reading",
  definition: "the answers the index gives back, each one a file read",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An answer about one page is one file read or one directory listed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name not saying its page type costs one read for each page type it could be rather than a walk of the corpus.",
    },
    {
      invariantKind: "departure",
      statement:
        "A directory listed is one page type's own and grows with that type and not with the corpus.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index names is answered as a path rather than as the entry.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every path the index files is answered by walking the one tree those paths are filed in.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is the corpus itself.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing else here walks.",
    },
    {
      invariantKind: "departure",
      statement: "What imports a file is refused when the index does not describe HEAD.",
    },
    {
      invariantKind: "departure",
      statement: "An index's path under the root is said here alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller that must name an index in a refusal says the path it reached rather than spelling it again.",
    },
    {
      invariantKind: "departure",
      statement: "A reader here takes the repository root or a reading of the index.",
    },
    {
      invariantKind: "absence",
      statement: "An answer about one page reads no stamp.",
    },
  ],
} as const satisfies Module
