import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const capacitorConfig = {
  id: "01a0591d-e23b-7c50-a41e-d7b67c89fa2a",
  type: "file-property",
  slug: "capacitor-config",
  propertySlug: "capacitor-config",
  definition: "what Capacitor is told to wrap and where it may go",
  extensions: ["json"],
  types: "ts",
} as const satisfies FileProperty
