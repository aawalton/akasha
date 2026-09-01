import type { Module } from "../../../code-system/module/module.page-type.ts"

export const storeWriting = {
  id: "01a05aec-eaaa-7be1-9528-6c84a071ce1c",
  pageTypeSlug: "module",
  slug: "store-writing",
  definition: "a body carried to the store at a path, and the commit it lands as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A write names a path and the whole body standing at it.",
    },
    {
      invariantKind: "departure",
      statement: "A write that committed answers with the commit it landed as.",
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
      statement: "A write naming a page by page type and name is refused rather than placed.",
    },
    {
      invariantKind: "departure",
      statement: "A patch is refused rather than read and written back.",
    },
    {
      invariantKind: "departure",
      statement: "A compare-and-set is never answered as won.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here renders a page's body.",
    },
  ],
} as const satisfies Module
