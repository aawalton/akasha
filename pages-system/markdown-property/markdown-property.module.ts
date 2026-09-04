import type { Module } from "@akasha/code-system/module"

export const markdownProperty = {
  id: "01a06746-c09f-731f-87a0-2959d43a9015",
  pageTypeSlug: "module",
  slug: "markdown-property",
  definition: "one property of a markdown page as its page type declares it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property is declared by a page type rather than by a page.",
    },
    {
      invariantKind: "departure",
      statement: "A property carries the page type slug the property was declared on.",
    },
    {
      invariantKind: "departure",
      statement: "A property carries the file the declaration was read from.",
    },
    {
      invariantKind: "departure",
      statement: "Every field a declaration does not fill is carried as null.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here parses or judges anything.",
    },
  ],
} as const satisfies Module
