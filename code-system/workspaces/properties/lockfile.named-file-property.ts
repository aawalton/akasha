import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type Lockfile = "lock"

export const lockfile = {
  id: "01a06cbb-60a1-700e-9f60-bf05f8f24dee",
  pageTypeSlug: "named-file-property",
  slug: "lockfile",
  propertySlug: "lockfile",
  definition: "what the package manager resolved every dependency to",
  fileName: "bun.lock",
  machineWritten: true,
  runsFileLength: false,
} as const satisfies NamedFileProperty
