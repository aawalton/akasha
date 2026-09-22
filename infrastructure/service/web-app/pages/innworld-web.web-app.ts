import type { WebApp } from "akasha/infrastructure/service/web-app/web-app.page-type.types.ts"

export const innworldWeb = {
  id: "01a0c5e8-634d-7877-94a2-18ccefbef0c4",
  type: "page-type/web-app",
  slug: "innworld-web",
  definition: "the wiki of The Wandering Inn",
  sourceDirectory: "product/wandering-inn-wiki/web",
  buildCommand: "bun run build",
  basePort: 3800,
  secretResource: "innworld-secrets",
  serviceClusters: ["service-cluster/innworld-web"],
} as const satisfies WebApp
