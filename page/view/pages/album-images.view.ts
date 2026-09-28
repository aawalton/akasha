import type { View } from "akasha/page/view/view.page-type.types.ts"

export const albumImages = {
  id: "01a0e9c6-3fbb-7211-9f22-8ba1fee24599",
  type: "page-type/view",
  slug: "album-images",
  title: "Images",
  pageType: "page-type/image",
  embeddedBy: "page-type/image-album",
  layout: "gallery",
  narrows: [],
  viewSorts: [],
  groupSorts: [],
  pageSize: 50,
  itemPageSize: 12,
  groupPageSize: 6,
  galleryCardSize: "large",
} as const satisfies View
