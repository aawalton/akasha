import type { Module } from "@akasha/code/module"

export const reaching = {
  id: "01a04f4d-00d6-727f-b504-659312870b32",
  pageTypeSlug: "module",
  type: "module",
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
      statement:
        "A page's own type is asked only where a key is carried by more than one property.",
    },
    {
      invariantKind: "departure",
      statement: "A field reaches only a property the record the field stands in declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "One key carried by two properties reaches each property under the type with that property.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key carried by two properties reaches nothing where a page's type has neither property.",
    },
    {
      invariantKind: "departure",
      statement: "A name saying its own page type is held to the target its property declares.",
    },
    {
      invariantKind: "departure",
      statement: "A name saying a scope reaches the page filed under that scope.",
    },
    {
      invariantKind: "departure",
      statement: "Which property scopes a page type is read from that page type's declarations.",
    },
    {
      invariantKind: "departure",
      statement: "A name becomes an address of one page address kind before the index is asked.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value that narrows to more than one page is refused rather than resolved to a single page.",
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
      statement: "The page a name reaches is said here alone.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a page type is mortal is answered beside the page a name reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A name stating a page type is judged mortal by that page type alone.",
    },
    {
      invariantKind: "departure",
      statement: "A name stating no page type is judged by every target its property declares.",
    },
    {
      invariantKind: "departure",
      statement: "Which property each key of a page carries is read here.",
    },
    {
      invariantKind: "departure",
      statement: "The value standing under that key is answered with that property.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page's `id` and `slug` and `pageTypeSlug` are answered as that page's identity.",
    },
    {
      invariantKind: "departure",
      statement: "How a caller answers a naming being an identity is that caller's own.",
    },
    {
      invariantKind: "departure",
      statement: "The module saying a page's entries names nothing here.",
    },
  ],
} as const satisfies Module
