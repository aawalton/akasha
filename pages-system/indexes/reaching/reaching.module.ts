import type { Module } from "@akasha/code-system/module"

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
      statement: "A property's target is read from the index rather than from the pages.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page's key reaches the property stating that key rather than the property its slug camelises to.",
    },
    {
      invariantKind: "departure",
      statement: "A key one property carries reaches that property.",
    },
    {
      invariantKind: "departure",
      statement: "A page's own type is asked only where a key is carried by more than one.",
    },
    {
      invariantKind: "departure",
      statement: "A field reaches only a property the record the field stands in declares.",
    },
    {
      invariantKind: "departure",
      statement: "One key carried by two properties reaches each under the type carrying it.",
    },
    {
      invariantKind: "departure",
      statement: "One a page's type carries neither of reaches nothing.",
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
      statement: "A property naming members is held to the target every member declares.",
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
        "A name nested in a record is filed from the page carrying the name rather than from the record.",
    },
    {
      invariantKind: "departure",
      statement: "What a name reaches is said here alone.",
    },
    {
      invariantKind: "departure",
      statement: "Which property each key of a page carries is read here.",
    },
    {
      invariantKind: "departure",
      statement: "What stands under that key is answered with that property.",
    },
    {
      invariantKind: "departure",
      statement: "A page's `id` is answered as the page's own.",
    },
    {
      invariantKind: "departure",
      statement: "A page's `slug` is answered as the page's own.",
    },
    {
      invariantKind: "departure",
      statement: "A page's `pageTypeSlug` is answered as the page's own.",
    },
    {
      invariantKind: "departure",
      statement: "What a caller does about a key being the page's own is that caller's own.",
    },
    {
      invariantKind: "departure",
      statement: "The module saying a page's entries names nothing here.",
    },
  ],
} as const satisfies Module
