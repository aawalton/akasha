import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const secretsConfig = {
  id: "01a06cd1-f990-7d6c-b247-6d2cc89c820e",
  type: "page-type/file-property",
  slug: "secrets-config",
  propertySlug: "secrets-config",
  definition: "the keys each encrypted file is sealed to",
  extensions: ["yaml"],
  fileName: ".sops.yaml",
  types: "ts",
  createdAt: "2026-09-04T14:28:15.376Z",
  updatedAt: "2026-09-15T16:56:11.000Z",
} as const satisfies FileProperty
