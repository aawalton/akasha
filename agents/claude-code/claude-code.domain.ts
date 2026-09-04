import type { Domain } from "../../domains/domain.page-type.ts"

export const claudeCode = {
  id: "01a065b0-2100-7a41-9c02-3e5197d4b91f",
  pageTypeSlug: "domain",
  slug: "claude-code",
  definition: "the program an agent in this system runs inside",
  partSlugs: ["domain/claude-code-session", "domain/claude-code-tools"],
} as const satisfies Domain
