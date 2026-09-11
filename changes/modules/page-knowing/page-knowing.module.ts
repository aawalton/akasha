import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pageKnowing = {
  id: "01a0795c-c0d5-7580-afd1-7b86083ef2dd",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-knowing",
  definition:
    "the page a world's index answers at a path, and the pages on either side of that page's edges",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path reading as no page file names no page.",
    },
    {
      invariantKind: "departure",
      statement: "A path with a section beside the page's own names no page.",
    },
    {
      invariantKind: "departure",
      statement: "A path the index files no page at names no page.",
    },
    {
      invariantKind: "departure",
      statement: "A page is read by its path rather than by the slug its name says.",
    },
    {
      invariantKind: "departure",
      statement: "The world is read rather than the disk.",
    },
    {
      invariantKind: "departure",
      statement: "An index that will not answer is refused with the reason rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A caller reading a page is handed the shape the index knows that page by.",
    },
    {
      invariantKind: "departure",
      statement: "The pages a key names are read from the property the key reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The pages naming a path under one property are answered from the world's index.",
    },
    {
      invariantKind: "departure",
      statement: "A key reaching no property names no page.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a key holds one value is read from the type the page states.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page's type names under no property holds many values.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides whether a page may be acted on.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a page's type declares a key is read from that type.",
    },
    { invariantKind: "departure", statement: "A type the index cannot read judges no key." },
    {
      invariantKind: "departure",
      statement: "A slug the page's type declares a key for answers that key.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling that is already a key answers no key.",
    },
    {
      invariantKind: "departure",
      statement: "The value a key holds is read from the page type the property descends from.",
    },
    {
      invariantKind: "departure",
      statement: "The key a new key falls after is read from the pages of the page's own type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key falls after the last key more of those pages write before it than after it.",
    },
    {
      invariantKind: "departure",
      statement: "A key none of those pages write falls after nothing.",
    },
    { invariantKind: "departure", statement: "A key the page already writes falls after nothing." },
    { invariantKind: "departure", statement: "No more than sixty-four of those pages are read." },
  ],
} as const satisfies Module
