import type { FileProperty } from "@akasha/pages/file-property"

export type ViteConfig = "ts"

export const viteConfig = {
  id: "01a07a2b-ce6d-742f-ba20-1758d8024c63",
  pageTypeSlug: "file-property",
  slug: "vite-config",
  propertySlug: "vite-config",
  definition: "what the bundler is told before it builds a router app",
  fileName: "vite.config.ts",
} as const satisfies FileProperty
