import type { NamedFileProperty } from "../../../pages-system/named-file-property/named-file-property.page-type.ts"

export type CapacitorConfig = "json"

export const capacitorConfig = {
  id: "01a0591d-e23b-7c50-a41e-d7b67c89fa2a",
  pageTypeSlug: "named-file-property",
  slug: "capacitor-config",
  propertySlug: "capacitor-config",
  definition: "what Capacitor is told to wrap and where it may go",
  fileName: "capacitor.config.json",
} as const satisfies NamedFileProperty
