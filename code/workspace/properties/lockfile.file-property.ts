import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const lockfile = {
  id: "01a06cbb-60a1-700e-9f60-bf05f8f24dee",
  type: "page-type/file-property",
  slug: "lockfile",
  propertySlug: "lockfile",
  definition: "what the package manager resolved every dependency to",
  extensions: ["lock"],
  fileName: "bun.lock",
  generated: true,
  runsFileLength: false,
  types: "ts",
  createdAt: "2026-09-04T14:03:34.433Z",
  updatedAt: "2026-09-15T16:56:11.000Z",
} as const satisfies FileProperty
