import type { Module } from "@akasha/code-system/module"

export const parentChildTree = {
  id: "01a05cce-25ec-7f1f-9ef2-c7f8e6617602",
  pageTypeSlug: "module",
  slug: "parent-child-tree",
  definition: "items nested under the parents they name, to a fixed depth",
  code: "ts",
} as const satisfies Module
