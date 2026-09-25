import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uuidVersion7 = {
  id: "01a07be9-0fe1-7ffb-9765-633921d012dd",
  type: "page-type/module",
  slug: "uuid-version-7",
  definition: "a uuid with the moment that uuid was made",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A uuid states version 7.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A uuid is judged version 7 by every part of that uuid rather than by one digit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The leading bytes have the millisecond the uuid was made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two uuids made in one millisecond are two uuids.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller stating no moment is taken to have said now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment a uuid was made is read back only from a uuid of version 7.",
    },
  ],
} as const satisfies Module
