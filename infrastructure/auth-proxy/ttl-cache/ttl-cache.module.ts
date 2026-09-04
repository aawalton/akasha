import type { Module } from "@akasha/code-system/module"

export const ttlCache = {
  id: "01a06863-8e7c-73b7-9277-f3ce34ede55e",
  pageTypeSlug: "module",
  slug: "ttl-cache",
  definition: "a store dropping its oldest entry and its expired ones",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Reading an entry makes the entry the newest.",
    },
    {
      invariantKind: "departure",
      statement: "An entry past its time reads as nothing and is dropped at the reading.",
    },
  ],
} as const satisfies Module
