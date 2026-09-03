import type { Location } from "../location.page-type.ts"

export const testCafe = {
  id: "019f1590-99b1-7afd-8738-e3203ca33e18",
  pageTypeSlug: "location",
  slug: "test-cafe",
  title: "Test Cafe",
  address: "123 Test St",
  locationCategory: "Cafe",
  collection: "my-places",
  cuisineOrType: "Coffee",
  visited: false,
} as const satisfies Location
