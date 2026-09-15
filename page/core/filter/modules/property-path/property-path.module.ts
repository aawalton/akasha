import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyPath = {
  id: "01a09c21-fff4-7f57-818b-b875ff41c6ce",
  type: "module",
  slug: "property-path",
  definition: "the values a dotted key reaches, a list along the way entered one at a time",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key holding a dot names a path, and a key holding no dot names one property.",
    },
    {
      invariantKind: "departure",
      statement: "The first segment of a path names the property a page carries.",
    },
    {
      invariantKind: "departure",
      statement: "A path is spelled one segment at a time, and the dots parting them remain.",
    },
    {
      invariantKind: "departure",
      statement: "A list reached on the way to the end is entered one element at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A segment no value carries reaches nothing rather than reaching a held nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The value at the end of a path is handed over whole, a list remaining a list.",
    },
    {
      invariantKind: "departure",
      statement: "A path reaching many values hands all of them over in the order they were found.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here weighs a value against anything.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page type or a property declaration.",
    },
  ],
} as const satisfies Module
