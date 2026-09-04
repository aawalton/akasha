import type { Module } from "@akasha/code-system/module"

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
      invariantKind: "departure",
      statement: "A patch writes back the bodies the patch read.",
    },
    {
      invariantKind: "departure",
      statement: "A patch states the commit its bodies were read at.",
    },
    {
      invariantKind: "departure",
      statement: "A patch a write landed under is refused rather than told the patch won.",
    },
    {
      invariantKind: "departure",
      statement: "A patch leaving every body as that body stood writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A page is taken away by the page type and the name the page is reached by.",
    },
    {
      invariantKind: "departure",
      statement: "A write stating the keys a page would carry is refused for want of a renderer.",
    },
    {
      invariantKind: "departure",
      statement:
        "A write naming a row inside a page is refused for want of a way to address a row.",
    },
    {
      invariantKind: "departure",
      statement: "A query asked for by name is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here renders a page's body.",
    },
  ],
} as const satisfies Module
