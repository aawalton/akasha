import type { Attribute } from "../attribute.page-type.ts"

export const luck = {
  id: "01a06841-a19b-775f-8183-8af74871a217",
  pageTypeSlug: "attribute",
  slug: "luck",
  definition: "what Alan has built by inviting rejection",
  pointUnit: "one rejection attempted",
  lifetimePoints: 0,
} as const satisfies Attribute
