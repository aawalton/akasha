import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const choiceAction = {
  id: "01a05b71-e543-7a3b-bf58-284e81073a14",
  pageTypeSlug: "module",
  slug: "choice-action",
  definition:
    "a player picking one option out of a system window, and how that pick reads back as a line of text",
  code: "ts",
} as const satisfies Module
