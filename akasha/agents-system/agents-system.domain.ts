import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const agentsSystem = {
  id: "01a0535c-f2cf-7d3b-9a3d-826379a0252b",
  pageTypeSlug: "domain",
  slug: "agents-system",
  definition: "how work is put to a model",
  partSlugs: ["domain/models", "page-type/claude-account"],
} as const satisfies Domain
