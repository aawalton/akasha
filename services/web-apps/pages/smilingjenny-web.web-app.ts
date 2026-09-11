import type { WebApp } from "akasha/services/web-apps/web-app.page-type.types.ts"

export const smilingjennyWeb = {
  id: "01a05b26-f8b6-72a2-affe-a1ea40040e3e",
  pageTypeSlug: "web-app",
  type: "web-app",
  slug: "smilingjenny-web",
  definition: "Jenny's command center on the web",
  sourceDirectory: "smilingjenny/web",
  buildCommand: "bun run build",
  secretResource: "smilingjenny-secrets",
  clusterServices: ["smilingjenny-web"],
  hostnames: ["smilingjenny.me"],
} as const satisfies WebApp
