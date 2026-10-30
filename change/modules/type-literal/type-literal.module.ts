import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const typeLiteral = {
  id: "01a09b74-c591-7172-9691-ea824ccdda55",
  type: "page-type/module",
  slug: "type-literal",
  definition: "the object type a named type alias in a TypeScript file holds",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "type literal" },
    { partOfSpeech: "part-of-speech/noun", spelling: "type literals" },
  ],
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An alias naming an object type answers that type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An alias joining types answers the first object type among them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An alias of anything else answers nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source naming no such alias answers nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change wanting this type reads it here rather than from another change.",
    },
  ],
  createdAt: "2026-09-13T15:48:36.369Z",
  updatedAt: "2026-10-30T17:41:40.576Z",
} as const satisfies Module
