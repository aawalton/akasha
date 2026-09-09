import type { ShowCollection } from "../show-collection.page-type.ts"

export const watchWithJen = {
  id: "01a06808-6a77-7015-90aa-b8b63f0139c0",
  pageTypeSlug: "show-collection",
  type: "show-collection",
  slug: "watch-with-jen",
  title: "Watch with Jen",
  partOfCollections: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
