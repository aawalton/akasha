import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const audhdalan = {
  id: "01a06558-c2cc-7000-8cc9-fca361852367",
  type: "domain",
  slug: "audhdalan",
  definition: "what Alan publishes about living autistic and ADHD",
  parts: ["page-type/audhdalan-subscriber", "router-app/audhdalan-web"],
} as const satisfies Domain
