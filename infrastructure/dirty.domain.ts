import type { Domain } from "../domains/domain.page-type.ts"

export const dirty = {
  id: "01a0675b-16dd-79a1-bc7c-da489f4139a0",
  pageTypeSlug: "domain",
  slug: "dirty",
  definition: "content a repository holds that nothing yet owns",
  partSlugs: ["page-type/partslug-nowhere"],
} as const satisfies Domain
