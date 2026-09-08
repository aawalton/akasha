import type { WebApp } from "../web-app.page-type.ts"

export const smilingjennyWeb = {
  id: "01a05b26-f8b6-72a2-affe-a1ea40040e3e",
  pageTypeSlug: "web-app",
  slug: "smilingjenny-web",
  definition: "Jenny's command center on the web",
  sourceDirectory: "smilingjenny/smilingjenny-web",
  buildCommand: "bun run build",
  clusterServiceSlugs: ["smilingjenny-web"],
  hostnames: ["smilingjenny.me"],
} as const satisfies WebApp
