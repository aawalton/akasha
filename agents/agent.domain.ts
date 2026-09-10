import type { Domain } from "../domains/domain.page-type.types.ts"

export const agent = {
  id: "01a0535c-f2cf-7d3b-9a3d-826379a0252b",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "agent",
  definition: "an agent and what puts its work to a model",
  parts: ["domain/claude-code", "domain/model", "page-type/agent", "page-type/claude-account"],
} as const satisfies Domain
