import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const storePageAsking = {
  id: "01a05aec-eaaa-78d0-9e24-94f935464bf0",
  type: "module",
  slug: "store-page-asking",
  definition: "a composed query put to the store, with the fetcher and the nap defaulted",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here has an answer for a later question.",
    },
  ],
} as const satisfies Module
