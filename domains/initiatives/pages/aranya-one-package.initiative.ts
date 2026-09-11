import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aranyaOnePackage = {
  id: "01a0876f-87da-77c3-9e65-8d261c7cbf2d",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "aranya-one-package",
  domain: "domain/akasha",
  persona: "aranya",
  parent: "initiative/akasha-folder-shape",
  intents: [],
} as const satisfies Initiative
