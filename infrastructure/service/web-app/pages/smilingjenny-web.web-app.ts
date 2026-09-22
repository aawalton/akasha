import type { WebApp } from "akasha/infrastructure/service/web-app/web-app.page-type.types.ts"

export const smilingjennyWeb = {
  id: "01a05b26-f8b6-72a2-affe-a1ea40040e3e",
  type: "page-type/web-app",
  slug: "smilingjenny-web",
  definition: "Jenny's command center on the web",
  sourceDirectory: "product/smilingjenny/web",
  buildCommand: "bun run build",
  secretResource: "smilingjenny-secrets",
  serviceClusters: ["service-cluster/smilingjenny-web"],
} as const satisfies WebApp
