import type { WebApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.types.ts"

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
  createdAt: "2026-09-21T21:38:56.461Z",
  updatedAt: "2026-09-27T12:32:11.000Z",
} as const satisfies WebApp
