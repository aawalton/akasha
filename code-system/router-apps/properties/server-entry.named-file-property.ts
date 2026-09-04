import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type ServerEntry = "tsx"

export const serverEntry = {
  id: "01a063f3-c2b1-706d-9c19-7e64f73ba4f6",
  pageTypeSlug: "named-file-property",
  slug: "server-entry",
  propertySlug: "server-entry",
  definition: "what renders a response before it leaves the server",
  fileName: "entry.server.tsx",
} as const satisfies NamedFileProperty
