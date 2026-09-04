import type { WebApp } from "../web-app.page-type.ts"

export const archiveOfWorldsWeb = {
  id: "01a05b26-f8b6-7c8b-8ab2-75fb9e885c54",
  pageTypeSlug: "web-app",
  slug: "archive-of-worlds-web",
  definition: "the site published original stories are read on",
  sourceDirectory: "archive-of-worlds/archive-of-worlds-web",
  buildCommand: "bun run build",
  clusterServiceSlugs: ["archive-of-worlds-web"],
  hostnames: ["archiveofworlds.app"],
} as const satisfies WebApp
