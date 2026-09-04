import type { ShowCollection } from "../show-collection.page-type.ts"

export const watchWithLizzy = {
  id: "01a06808-6a77-7017-b0dd-953bd5d2c830",
  pageTypeSlug: "show-collection",
  slug: "watch-with-lizzy",
  title: "Watch with Lizzy",
  partOfSlugs: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
