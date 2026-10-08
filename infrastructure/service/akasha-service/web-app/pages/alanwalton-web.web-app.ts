import type { WebApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.types.ts"

export const alanwaltonWeb = {
  id: "01a05b26-f8b6-7f72-b1d5-6cc786250efe",
  type: "page-type/web-app",
  slug: "alanwalton-web",
  title: "Alan",
  definition: "Alan's command center on the web",
  sourceDirectory: "alan/web",
  buildCommand: "bun run build",
  basePort: 3000,
  secretResource: "alanwalton-secrets",
  serviceClusters: ["service-cluster/alanwalton-web"],
  createdAt: "2026-09-01T04:07:55.830Z",
  updatedAt: "2026-09-27T11:54:39.000Z",
} as const satisfies WebApp
