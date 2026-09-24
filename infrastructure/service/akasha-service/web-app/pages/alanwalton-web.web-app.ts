import type { WebApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.types.ts"

export const alanwaltonWeb = {
  id: "01a05b26-f8b6-7f72-b1d5-6cc786250efe",
  type: "page-type/web-app",
  slug: "alanwalton-web",
  definition: "Alan's command center on the web",
  sourceDirectory: "alan/web",
  buildCommand: "bun run build",
  basePort: 3000,
  secretResource: "alanwalton-secrets",
  serviceClusters: ["service-cluster/alanwalton-web"],
} as const satisfies WebApp
