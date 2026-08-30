import type { Module } from "../../../code-system/module/module.page-type.ts"

export const reaching = {
  id: "01a04f4d-00d6-727f-b504-659312870b32",
  pageTypeSlug: "module",
  slug: "reaching",
  definition: "the page a name reaches, and the edges the names in a page imply",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property's target is read from the index rather than from the corpus.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page's key reaches the property stating that key rather than the property its slug camelises to.",
    },
    {
      invariantKind: "departure",
      statement: "A name saying its own page type is held to the target its property declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value that narrows to more than one page is refused rather than resolved to one of them.",
    },
    {
      invariantKind: "departure",
      statement: "A value the index cannot resolve is reported rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming the same page twice files one edge.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name nested in a record is filed from the page carrying it rather than from the record.",
    },
    {
      invariantKind: "departure",
      statement: "What a name reaches is said here alone.",
    },
    {
      invariantKind: "departure",
      statement: "The module saying a page's entries names nothing here.",
    },
  ],
} as const satisfies Module
