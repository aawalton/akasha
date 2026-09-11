import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export const sidebarBoot = {
  id: "01a0817a-b64a-73c8-a3fa-8f646a076346",
  type: "code-file-property",
  slug: "sidebar-boot",
  propertySlug: "sidebar-boot",
  definition: "what sets the sidebar collapsed or expanded before the page first paints",
  extensions: ["js"],
  fileName: "public/sidebar-boot.js",
  types: "ts",
} as const satisfies CodeFileProperty
