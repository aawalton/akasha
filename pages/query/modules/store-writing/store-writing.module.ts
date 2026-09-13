import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const storeWriting = {
  id: "01a05aec-eaaa-7be1-9528-6c84a071ce1c",
  type: "module",
  slug: "store-writing",
  definition: "a body carried to the store at a path, and the commit it lands as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A write names a path and the whole body standing at that path.",
    },
    {
      invariantKind: "departure",
      statement: "A write that committed answers with the commit the write landed as.",
    },
    {
      invariantKind: "departure",
      statement: "A write that committed nothing is answered as not written.",
    },
    {
      invariantKind: "departure",
      statement: "A writer is a name and an address.",
    },
    {
      invariantKind: "departure",
      statement: "A writer shaped otherwise is refused before the store is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A read answers with a whole body and the commit the body was read at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here renders a page's body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here addresses a row inside a page.",
    },
  ],
} as const satisfies Module
