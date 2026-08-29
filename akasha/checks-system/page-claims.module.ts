import type { Module } from "../code-system/module/module.page-type.ts"

export const pageClaims = {
  id: "01a04b6b-f09f-77fa-b4b0-e527112cf57f",
  pageTypeSlug: "module",
  slug: "page-claims",
  definition: "the file each page claims as one of its properties' own",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: ["domain/akasha-file", "module/corpus"],
  design: [
    "Which properties are held in a file is read from the property types, never from a list kept here.",
    "A claim is what the page says should be there, so it is made whether or not the file is.",
  ],
} as const satisfies Module
