import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const self = {
  id: "01a06576-0000-7000-8000-000000000101",
  pageTypeSlug: "domain",
  slug: "self",
  definition: "who Alan is working to become",
  partSlugs: ["page-type/identity-statement", "page-type/life-theme"],
} as const satisfies Domain
