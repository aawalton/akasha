import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageValueReading = {
  id: "01a076b5-96a3-7e49-a821-ec55720b1f74",
  type: "module",
  slug: "page-value-reading",
  definition: "what one key of a page's value has, read off a value already in hand",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key is read as the type that key is asked for or as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value naming a page by page type and slug is read here for its slug alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key naming a page or a list of pages is read here as a list of slugs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page type a value is, is read here under either key a value states it as.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "One reader here answers empty text as empty text and another answers empty text as nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Neither reader is exchanged for a module, because a module answers only one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key holding one record or a list of them is read here as a list of records.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A browser reaches this module and never the module loading a value from a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here imports a module node carries.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here loads a body.",
    },
  ],
} as const satisfies Module
