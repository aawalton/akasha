import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const secretsConfig = {
  id: "01a06cd1-f990-7d6c-b247-6d2cc89c820e",
  type: "file-property",
  slug: "secrets-config",
  propertySlug: "secrets-config",
  definition: "the keys each encrypted file is sealed to",
  extensions: ["yaml"],
  fileName: ".sops.yaml",
  types: "ts",
} as const satisfies FileProperty
