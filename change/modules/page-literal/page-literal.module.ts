import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageLiteral = {
  id: "01a07958-2f4f-7bd9-b5c2-d794c5150eb9",
  type: "module",
  slug: "page-literal",
  definition: "what the parser reads of the object a page's body exports",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The object answered is the object the first exported declaration has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body exporting no object literal answers no object.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key spelled bare and a key spelled as a string are one key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a word is spelled bare is read here rather than by each caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The fault in a key a page cannot spell is worded here rather than by each caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key spelled bare has no fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fault names the key that spelling makes where that spelling is bare.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The fault in an `after` the object states nowhere is worded here rather than by each caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An `after` the object states has no fault, and no `after` stated has none either.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key stating anything but text is left out of the text answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a key has many values is read from the body rather than from the type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the body states no value under has no many values.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name answered is the name the exported object is bound to.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges the value a key has.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here rewrites a body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The text a key states is read off an object handed in rather than off a body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The records a key holds are the objects in the list that key states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry in that list that is no object is no record.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key stating no list has no records.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record is matched by the text a named field of that record states.",
    },
  ],
} as const satisfies Module
