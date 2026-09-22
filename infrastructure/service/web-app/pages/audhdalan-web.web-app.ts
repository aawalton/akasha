import type { WebApp } from "akasha/infrastructure/service/web-app/web-app.page-type.types.ts"

export const audhdalanWeb = {
  id: "01a05b26-f8b6-779c-b687-646b4c535258",
  type: "page-type/web-app",
  slug: "audhdalan-web",
  definition: "the site publishing Alan's neurodiversity writing",
  sourceDirectory: "product/audhdalan/web",
  buildCommand: "bun run build",
  basePort: 3100,
  secretResource: "audhdalan-secrets",
  serviceClusters: ["service-cluster/audhdalan-web"],
} as const satisfies WebApp
