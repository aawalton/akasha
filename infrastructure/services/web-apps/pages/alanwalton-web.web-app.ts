import type { WebApp } from "akasha/infrastructure/services/web-apps/web-app.page-type.types.ts"

export const alanwaltonWeb = {
  id: "01a05b26-f8b6-7f72-b1d5-6cc786250efe",
  type: "web-app",
  slug: "alanwalton-web",
  definition: "Alan's command center on the web",
  sourceDirectory: "alan/web",
  buildCommand: "bun run build",
  basePort: 3000,
  secretResource: "alanwalton-secrets",
  serviceClusters: ["alanwalton-web"],
  hostnames: [
    "alanwalton.com",
    "webhook.alanwalton.com",
    "sms.alanwalton.com",
    "idle.alanwalton.com",
  ],
} as const satisfies WebApp
