import type { FileProperty } from "@akasha/pages/file-property"

export type Lockfile = "lock"

export const lockfile = {
  id: "01a06cbb-60a1-700e-9f60-bf05f8f24dee",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "lockfile",
  propertySlug: "lockfile",
  definition: "what the package manager resolved every dependency to",
  fileName: "bun.lock",
  generated: true,
  runsFileLength: false,
} as const satisfies FileProperty
