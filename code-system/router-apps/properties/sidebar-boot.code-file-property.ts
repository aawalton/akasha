import type { CodeFileProperty } from "@akasha/pages/code-file-property"

export type SidebarBoot = "js"

export const sidebarBoot = {
  id: "01a0817a-b64a-73c8-a3fa-8f646a076346",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "sidebar-boot",
  propertySlug: "sidebar-boot",
  definition: "what sets the sidebar collapsed or expanded before the page first paints",
  fileName: "public/sidebar-boot.js",
} as const satisfies CodeFileProperty
