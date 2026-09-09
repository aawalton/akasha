import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buildMetadata = {
  id: "01a061c0-88d8-7527-81f9-44b8e63a9668",
  pageTypeSlug: "module",
  slug: "build-metadata",
  definition: "a build's name, description and roles read off its state and put back on it",
  code: "ts",
} as const satisfies Module
