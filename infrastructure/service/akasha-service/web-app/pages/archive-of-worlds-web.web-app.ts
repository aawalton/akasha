import type { WebApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.types.ts"

export const archiveOfWorldsWeb = {
  id: "01a05b26-f8b6-7c8b-8ab2-75fb9e885c54",
  type: "page-type/web-app",
  slug: "archive-of-worlds-web",
  definition: "the site where published original stories are read",
  sourceDirectory: "product/archive-of-worlds/web",
  buildCommand: "bun run build",
  basePort: 3500,
  secretResource: "archive-of-worlds-secrets",
  serviceClusters: ["service-cluster/archive-of-worlds-web"],
} as const satisfies WebApp
