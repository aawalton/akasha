import type { WebApp } from "akasha/infrastructure/services/web-apps/web-app.page-type.types.ts"

export const audhdalanWeb = {
  id: "01a05b26-f8b6-779c-b687-646b4c535258",
  type: "web-app",
  slug: "audhdalan-web",
  definition: "the site Alan's neurodiversity writing is published on",
  sourceDirectory: "products/audhdalan/web",
  buildCommand: "bun run build",
  basePort: 3100,
  secretResource: "audhdalan-secrets",
  serviceClusters: ["audhdalan-web"],
  hostnames: ["audhdalan.com"],
} as const satisfies WebApp
