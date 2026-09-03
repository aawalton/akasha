import type { WebApp } from "../web-app.page-type.ts"

export const alanwaltonAtlasWeb = {
  id: "01a05b26-f8b6-728b-8cfa-601811ce0f90",
  pageTypeSlug: "web-app",
  slug: "alanwalton-atlas-web",
  definition: "the website drawing Alan's map and taking in the locations his phone sends",
  sourceDirectory: "akasha/alan/atlas-web",
  buildCommand: "bun run build",
  clusterServiceSlugs: ["alanwalton-atlas"],
  hostnames: ["atlas.alanwalton.com"],
} as const satisfies WebApp
