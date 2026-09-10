import type { Domain } from "../../domains/domain.page-type.types.ts"

export const self = {
  id: "01a06576-0000-7000-8000-000000000101",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "self",
  definition: "who Alan is working to become",
  parts: ["page-type/identity-statement", "page-type/life-theme"],
} as const satisfies Domain
