import type { CodeFileProperty } from "@akasha/pages/code-file-property"

export type ViteConfig = "ts"

export const viteConfig = {
  id: "01a07a2b-ce6d-742f-ba20-1758d8024c63",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "vite-config",
  propertySlug: "vite-config",
  definition: "what the bundler is told before it builds a router app",
  fileName: "vite.config.ts",
} as const satisfies CodeFileProperty
