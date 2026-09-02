import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const music = {
  id: "01a06222-4d01-78f8-8ed6-e3f5ec16f8a3",
  pageTypeSlug: "domain",
  slug: "music",
  definition: "music heard and what is kept of it",
  pluralSlug: "music",
} as const satisfies Domain
