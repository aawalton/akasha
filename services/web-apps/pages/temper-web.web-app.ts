import type { WebApp } from "../web-app.page-type.ts"

export const temperWeb = {
  id: "01a05b26-f8b6-7a52-a21e-599a20af3732",
  pageTypeSlug: "web-app",
  slug: "temper-web",
  definition: "the parts of Temper that run in a browser",
  sourceDirectory: "temper/temper-web",
  buildCommand: "bun run build",
  clusterServiceSlugs: ["temper-web"],
  hostnames: ["tempereso.com", "www.tempereso.com"],
} as const satisfies WebApp
