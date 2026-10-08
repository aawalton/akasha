import type { WebApp } from "akasha/infrastructure/service/akasha-service/web-app/web-app.page-type.types.ts"

export const temperWeb = {
  id: "01a05b26-f8b6-7a52-a21e-599a20af3732",
  type: "page-type/web-app",
  slug: "temper-web",
  definition: "the parts of Temper that run in a browser",
  sourceDirectory: "temper/web",
  buildCommand: "bun run build",
  basePort: 3300,
  secretResource: "temper-secrets",
  serviceClusters: ["service-cluster/temper-web"],
  createdAt: "2026-09-01T04:07:55.830Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies WebApp
