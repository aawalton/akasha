import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const mechanic = {
  id: "01a0c9cc-0a1c-738e-b576-26e22d6c3837",
  type: "page-type/domain",
  slug: "mechanic",
  definition: "how a game works",
  parts: ["domain/mechanic-metric", "domain/skill"],
  createdAt: "2026-09-22T15:46:27.484Z",
  updatedAt: "2026-09-25T14:31:17.000Z",
} as const satisfies Domain
