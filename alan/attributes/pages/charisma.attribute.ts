import type { Attribute } from "../attribute.page-type.ts"

export const charisma = {
  id: "01a06841-a142-7b48-90d6-bb5e2c5138dd",
  pageTypeSlug: "attribute",
  slug: "charisma",
  definition: "what Alan has built by hours spent at ease",
  pointUnit: "one hour of a stretch whose safety less its difficulty is at least 1",
  lifetimePoints: 0,
} as const satisfies Attribute
