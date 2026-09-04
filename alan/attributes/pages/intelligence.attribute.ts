import type { Attribute } from "../attribute.page-type.ts"

export const intelligence = {
  id: "01a06841-a185-7471-8155-9b91e3f40e35",
  pageTypeSlug: "attribute",
  slug: "intelligence",
  definition: "what Alan has built by learning about the world",
  pointUnit: "10,000 net words added to a learn-everything topic",
  lifetimePoints: 0,
} as const satisfies Attribute
