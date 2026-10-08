import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const audhdalan = {
  id: "01a06558-c2cc-7000-8cc9-fca361852367",
  type: "page-type/domain",
  slug: "audhdalan",
  definition: "what Alan publishes about living autistic and ADHD",
  parts: ["page-type/audhdalan-subscriber", "router-app/audhdalan-web"],
  createdAt: "2026-09-03T03:38:30.988Z",
  updatedAt: "2026-09-15T16:35:22.000Z",
} as const satisfies Domain
