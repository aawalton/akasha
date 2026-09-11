import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export const serverEntry = {
  id: "01a063f3-c2b1-706d-9c19-7e64f73ba4f6",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "server-entry",
  propertySlug: "server-entry",
  definition: "what renders a response before it leaves the server",
  extensions: ["tsx"],
  fileName: "entry.server.tsx",
  types: "ts",
} as const satisfies CodeFileProperty
