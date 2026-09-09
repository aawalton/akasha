import type { Module } from "@akasha/code/module"

export const pageValueReading = {
  id: "01a076b5-96a3-7e49-a821-ec55720b1f74",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-value-reading",
  definition: "what one key of a page's value has, read off a value already in hand",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key is read as the type that key is asked for or as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A value naming a page by page type and slug is read here for its slug alone.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming a page or a list of pages is read here as a list of slugs.",
    },
    {
      invariantKind: "departure",
      statement:
        "One reader here answers empty text as empty text and another answers empty text as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A browser reaches this module and never the module loading a value from a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here imports a module node carries.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here loads a body.",
    },
  ],
} as const satisfies Module
