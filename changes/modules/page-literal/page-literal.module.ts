import type { Module } from "@akasha/code/module"

export const pageLiteral = {
  id: "01a07958-2f4f-7bd9-b5c2-d794c5150eb9",
  pageTypeSlug: "module",
  slug: "page-literal",
  definition: "what the parser reads of the object a page's body exports",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The object answered is the object the first exported declaration holds.",
    },
    {
      invariantKind: "departure",
      statement: "A body exporting no object literal answers no object.",
    },
    {
      invariantKind: "departure",
      statement: "A key spelled bare and a key spelled as a string are one key.",
    },
    {
      invariantKind: "departure",
      statement: "A key stating anything but text is left out of the text answered.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a key holds many values is read from the body rather than from the type.",
    },
    {
      invariantKind: "departure",
      statement: "A key the body states no value under holds no many values.",
    },
    {
      invariantKind: "departure",
      statement: "The name answered is the name the exported object is bound to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges the value a key holds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rewrites a body.",
    },
  ],
} as const satisfies Module
