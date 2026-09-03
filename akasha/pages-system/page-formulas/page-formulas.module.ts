import type { Module } from "@akasha/code-system/module"

export const pageFormulas = {
  id: "01a06952-7a5d-7adb-9506-fb5173849dfb",
  pageTypeSlug: "module",
  slug: "page-formulas",
  definition: "the figures a page type's formulas work out over the values a page carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A formula reads only keys the page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A key a formula reads is spelled as the property's own slug.",
    },
    {
      invariantKind: "departure",
      statement: "A figure is written down under the key a page file would spell.",
    },
    {
      invariantKind: "departure",
      statement: "The sort a stored property is says what kind that property holds.",
    },
    {
      invariantKind: "departure",
      statement: "A sort with no kind written down bars every figure the page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A sort carrying no value a formula can read is left out of the shape.",
    },
    {
      invariantKind: "departure",
      statement: "A property carried many times holds a list.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is built for a page type declaring no formula.",
    },
    {
      invariantKind: "departure",
      statement: "A figure is worked out after every figure that figure reads.",
    },
    {
      invariantKind: "departure",
      statement: "A figure answering absent puts no key on the page.",
    },
    {
      invariantKind: "departure",
      statement: "An instant a figure answers is written down as an ISO timestamp.",
    },
    {
      invariantKind: "departure",
      statement: "A formula property whose page states no formula bars every figure.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file or reaches a store.",
    },
    {
      invariantKind: "absence",
      statement: "No figure is kept for a later question.",
    },
  ],
} as const satisfies Module
