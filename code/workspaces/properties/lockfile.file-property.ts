import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const lockfile = {
  id: "01a06cbb-60a1-700e-9f60-bf05f8f24dee",
  type: "file-property",
  slug: "lockfile",
  propertySlug: "lockfile",
  definition: "what the package manager resolved every dependency to",
  extensions: ["lock"],
  fileName: "bun.lock",
  generated: true,
  runsFileLength: false,
  types: "ts",
} as const satisfies FileProperty
