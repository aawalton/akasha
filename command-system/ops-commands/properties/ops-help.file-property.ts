import type { FileProperty } from "@akasha/pages-system/file-property"

export type OpsHelp = "txt"

export const opsHelp = {
  id: "01a06904-5241-7683-a546-26068d539761",
  pageTypeSlug: "file-property",
  slug: "ops-help",
  propertySlug: "ops-help",
  definition: "the prose one ops command's help prints",
} as const satisfies FileProperty
