import type { Module } from "@akasha/code-system/module"

export const pageComposing = {
  id: "01a05de9-57a4-7810-8d1f-402752b1598b",
  pageTypeSlug: "module",
  slug: "page-composing",
  definition: "the values a caller hands over, made into a page and what it keeps beside it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller hands over a page type and a slug and values.",
    },
    {
      invariantKind: "absence",
      statement: "A caller hands over no path and no body.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which values are committed is read from the page type rather than from the caller.",
    },
    {
      invariantKind: "departure",
      statement: "A property the page type declares as uncommitted is kept beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Every other property is written into the page.",
    },
    {
      invariantKind: "departure",
      statement: "The keys are written in the order they are declared.",
    },
    {
      invariantKind: "departure",
      statement: "The type deepest in the descent declares first.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index already holds is written back at the path it has.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index does not hold is placed under its type's folder by the plural.",
    },
    {
      invariantKind: "departure",
      statement: "A value under a key the page type declares no property for is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A value under a property the page type declares secret is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Several pages compose into what one write puts and what it keeps.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole list.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
