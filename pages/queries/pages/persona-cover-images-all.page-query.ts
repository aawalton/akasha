import type { PageQuery } from "../page-query.page-type.types.ts"

export const personaCoverImagesAll = {
  id: "01a063f9-220c-78eb-827f-c5e873d42fb1",
  pageTypeSlug: "page-query",
  type: "page-query",
  slug: "persona-cover-images-all",
  asksOfSlug: "persona-cover-image",
  keys: ["persona", "relationshipLevel", "imagePath"],
} as const satisfies PageQuery
