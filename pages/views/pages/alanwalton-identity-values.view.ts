import type { View } from "../view.page-type.types.ts"

export const alanwaltonIdentityValues = {
  id: "01a06577-2614-7002-a57f-36cabc33d4cc",
  pageTypeSlug: "view",
  type: "view",
  slug: "alanwalton-identity-values",
  title: "Values",
  nav: "alanwalton-identity",
  pageType: "value",
  viewPlace: 0,
  layout: "cards",
  visibleProperties: ["color"],
  alwaysShowProperties: ["color"],
  hiddenPropertiesOrder: [
    "description",
    "created-at",
    "page-type-id",
    "seq",
    "sort-order",
    "updated-at",
  ],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
