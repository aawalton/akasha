import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const roleSystem = {
  id: "01a053b2-2c20-7d34-ac84-bace7277929a",
  pageTypeSlug: "domain",
  slug: "role-system",
  definition: "the work an agent is answerable for, and what is asked of whoever takes it",
  partSlugs: ["page-type/role"],
} as const satisfies Domain
