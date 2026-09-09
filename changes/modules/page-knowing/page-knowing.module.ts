import type { Module } from "@akasha/code/module"

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
  ],
} as const satisfies Module
