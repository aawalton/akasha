import type { WebApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.types.ts"

export const alanwaltonAtlasWeb = {
  id: "01a05b26-f8b6-728b-8cfa-601811ce0f90",
  type: "page-type/web-app",
  slug: "alanwalton-atlas-web",
  title: "Atlas",
  definition: "the website drawing Alan's map and taking in the locations his phone sends",
  sourceDirectory: "alan/atlas-web",
  buildCommand: "bun run build",
  basePort: 3600,
  secretResource: "alanwalton-secrets",
  serviceClusters: ["service-cluster/alanwalton-atlas"],
  createdAt: "2026-09-01T04:07:55.830Z",
  updatedAt: "2026-09-27T11:48:56.000Z",
} as const satisfies WebApp
