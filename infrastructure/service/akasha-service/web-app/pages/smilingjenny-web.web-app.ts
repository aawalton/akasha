import type { WebApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.types.ts"

export const smilingjennyWeb = {
  id: "01a05b26-f8b6-72a2-affe-a1ea40040e3e",
  type: "page-type/web-app",
  slug: "smilingjenny-web",
  title: "Smiling Jenny",
  definition: "Jenny's command center on the web",
  sourceDirectory: "product/smilingjenny/web",
  buildCommand: "bun run build",
  secretResource: "smilingjenny-secrets",
  serviceClusters: ["service-cluster/smilingjenny-web"],
  createdAt: "2026-09-01T04:07:55.830Z",
  updatedAt: "2026-09-27T11:59:05.000Z",
} as const satisfies WebApp
