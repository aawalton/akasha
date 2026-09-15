import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pagePropertyRenaming = {
  id: "01a09c40-38dc-7202-905e-d8da618765b4",
  type: "module",
  slug: "page-property-renaming",
  definition: "the passages in one body where a page property's key or its slug is spelled anew",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A passage is answered as a splice so one body's passages land together.",
    },
    {
      invariantKind: "departure",
      statement: "The slug a property's page states is answered as the text under the key named.",
    },
    {
      invariantKind: "departure",
      statement: "A body stating no text under that key is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body already stating the slug asked for is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The key respelled sits in the exported object itself where no holding key is named.",
    },
    {
      invariantKind: "departure",
      statement: "A holding key named respells the key in each record that key states.",
    },
    {
      invariantKind: "departure",
      statement: "A record stating no such key is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A body already stating the key asked for is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body exporting no object is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key spelled as a string is respelled as a string.",
    },
    {
      invariantKind: "departure",
      statement: "Every entry of a run of entries stating that key has the key respelled.",
    },
    {
      invariantKind: "departure",
      statement: "An entry stating no such key is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "One passage is answered however many entries are respelled.",
    },
    {
      invariantKind: "departure",
      statement: "A key inside a value an entry states is left as that key is.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is no run of entries is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or an index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads which pages carry the property.",
    },
  ],
} as const satisfies Module
