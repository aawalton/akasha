import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const typeLiteral = {
  id: "01a09b74-c591-7172-9691-ea824ccdda55",
  type: "module",
  slug: "type-literal",
  definition: "the object type a named type alias in a source holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An alias naming an object type answers that type.",
    },
    {
      invariantKind: "departure",
      statement: "An alias joining types answers the first object type among them.",
    },
    {
      invariantKind: "departure",
      statement: "An alias of anything else answers nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A source naming no such alias answers nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A change wanting this type reads it here rather than from another change.",
    },
  ],
} as const satisfies Module
