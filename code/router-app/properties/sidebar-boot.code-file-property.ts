import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const sidebarBoot = {
  id: "01a0817a-b64a-73c8-a3fa-8f646a076346",
  type: "page-type/code-file-property",
  slug: "sidebar-boot",
  propertySlug: "sidebar-boot",
  definition: "what sets the sidebar collapsed or expanded before the page first paints",
  extensions: ["js"],
  fileName: "public/sidebar-boot.js",
  types: "ts",
  createdAt: "2026-09-08T14:44:58.058Z",
  updatedAt: "2026-09-15T16:19:31.000Z",
} as const satisfies CodeFileProperty
