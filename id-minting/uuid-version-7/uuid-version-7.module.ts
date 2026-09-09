import type { Module } from "../../code-system/modules/module.page-type.ts"

export const uuidVersion7 = {
  id: "01a07be9-0fe1-7ffb-9765-633921d012dd",
  pageTypeSlug: "module",
  type: "module",
  slug: "uuid-version-7",
  definition: "a uuid with the moment that uuid was made",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A uuid states version 7.",
    },
    {
      invariantKind: "departure",
      statement: "The leading bytes have the millisecond the uuid was made.",
    },
    {
      invariantKind: "departure",
      statement: "Two uuids made in one millisecond are two uuids.",
    },
    {
      invariantKind: "departure",
      statement: "A caller stating no moment is taken to have said now.",
    },
  ],
} as const satisfies Module
