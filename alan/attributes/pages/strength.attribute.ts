import type { Attribute } from "../attribute.page-type.ts"

export const strength = {
  id: "01a06841-a1b4-731f-8d52-fe93c3564922",
  pageTypeSlug: "attribute",
  slug: "strength",
  definition: "what Alan has built by lifting weight",
  pointUnit: "1000 kilograms lifted",
  lifetimePoints: 0,
} as const satisfies Attribute
