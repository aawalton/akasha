import type { Module } from "@akasha/code-system/module"

export const textColor = {
  id: "01a05c97-5302-71a3-b9f8-f3bbd1c59f22",
  pageTypeSlug: "module",
  slug: "text-color",
  definition: "the greys text is drawn in, by how much of the reader's attention it is owed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Text falls towards its surface as the text matters less.",
    },
  ],
} as const satisfies Module
