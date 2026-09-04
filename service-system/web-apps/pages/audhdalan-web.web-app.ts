import type { WebApp } from "../web-app.page-type.ts"

export const audhdalanWeb = {
  id: "01a05b26-f8b6-779c-b687-646b4c535258",
  pageTypeSlug: "web-app",
  slug: "audhdalan-web",
  definition: "the site Alan's neurodiversity writing is published on",
  sourceDirectory: "akasha/audhdalan/audhdalan-web",
  buildCommand: "bun run build",
  clusterServiceSlugs: ["audhdalan-web"],
  hostnames: ["audhdalan.com"],
} as const satisfies WebApp
