import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setIds = {
  id: "01a060d5-2f12-7886-bf98-e23a2afc639d",
  pageTypeSlug: "module",
  slug: "set-ids",
  definition: "every Elder Scrolls Online gear set a character may wear, named as one type",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This union is written out from the set pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "This union names exactly the set keys the set pages carry.",
    },
    {
      invariantKind: "gap",
      statement: "A set page added while this union is left alone cannot be named in typed code.",
    },
  ],
} as const satisfies Module
