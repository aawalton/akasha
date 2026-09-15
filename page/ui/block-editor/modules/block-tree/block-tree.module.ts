import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const blockTree = {
  id: "01a06164-b506-700e-903b-fbbe63e551e5",
  type: "page-type/module",
  slug: "block-tree",
  definition: "Renders a block and its children as nested rows, leaving out the collapsed ones.",
  code: "tsx",
} as const satisfies Module
