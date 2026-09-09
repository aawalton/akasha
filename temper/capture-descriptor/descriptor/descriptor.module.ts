import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const descriptor = {
  id: "01a06053-3638-7cb5-b297-d04869965330",
  pageTypeSlug: "module",
  slug: "descriptor",
  definition: "the name, version and defaults one add-on hands the game to save under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A saved table is reached under the key `Default`.",
    },
    {
      invariantKind: "departure",
      statement: "An account key begins with an at sign.",
    },
    {
      invariantKind: "departure",
      statement: "State every character shares sits under the key `$AccountWide`.",
    },
    {
      invariantKind: "departure",
      statement: "The descriptor states whether a load time is kept.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
