import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Workspaces = "json"

export const workspaces = {
  id: "01a08197-d70e-7175-aa94-0e50037aed03",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "workspaces",
  propertySlug: "workspaces",
  definition: "the globs the audit reads one workspace's files under",
} as const satisfies FileProperty
