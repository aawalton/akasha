import type { WebApp } from "../web-app.page-type.ts"

export const alanwaltonWeb = {
  id: "01a05b26-f8b6-7f72-b1d5-6cc786250efe",
  pageTypeSlug: "web-app",
  slug: "alanwalton-web",
  definition: "Alan's command center on the web",
  sourceDirectory: "akasha/alan/web",
  buildCommand: "bun run build",
  clusterServiceSlugs: ["alanwalton-web"],
  hostnames: [
    "alanwalton.com",
    "webhook.alanwalton.com",
    "sms.alanwalton.com",
    "idle.alanwalton.com",
  ],
} as const satisfies WebApp
