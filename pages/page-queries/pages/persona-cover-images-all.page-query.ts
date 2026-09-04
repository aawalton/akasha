import type { PageQuery } from "../page-query.page-type.ts"

export const personaCoverImagesAll = {
  id: "01a063f9-220c-78eb-827f-c5e873d42fb1",
  pageTypeSlug: "page-query",
  slug: "persona-cover-images-all",
  asksOfSlug: "persona-cover-image",
  keys: ["persona-slug", "relationship-level", "image-path"],
} as const satisfies PageQuery
