import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const workspaces = {
  id: "01a08197-d70e-7175-aa94-0e50037aed03",
  type: "file-property",
  slug: "workspaces",
  propertySlug: "workspaces",
  definition: "the globs the audit reads one workspace's files under",
  extensions: ["json"],
  types: "ts",
} as const satisfies FileProperty
