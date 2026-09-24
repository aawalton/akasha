import type { WebApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.types.ts"

export const alanwaltonRequestsWeb = {
  id: "01a0c537-bbb9-76f6-9f8b-4c7ce619dfe9",
  type: "page-type/web-app",
  slug: "alanwalton-requests-web",
  definition: "the website drawing the Requests site",
  sourceDirectory: "alan/requests-web",
  buildCommand: "bun run build",
  basePort: 3700,
  secretResource: "alanwalton-secrets",
  serviceClusters: ["service-cluster/alanwalton-requests"],
} as const satisfies WebApp
