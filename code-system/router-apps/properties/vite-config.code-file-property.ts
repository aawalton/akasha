import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export const viteConfig = {
  id: "01a07a2b-ce6d-742f-ba20-1758d8024c63",
  type: "code-file-property",
  slug: "vite-config",
  propertySlug: "vite-config",
  definition: "what the bundler is told before it builds a router app",
  extensions: ["ts"],
  fileName: "vite.config.ts",
  types: "ts",
} as const satisfies CodeFileProperty
