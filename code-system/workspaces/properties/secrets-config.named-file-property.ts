import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type SecretsConfig = "yaml"

export const secretsConfig = {
  id: "01a06cd1-f990-7d6c-b247-6d2cc89c820e",
  pageTypeSlug: "named-file-property",
  slug: "secrets-config",
  propertySlug: "secrets-config",
  definition: "the keys each encrypted file is sealed to",
  fileName: ".sops.yaml",
} as const satisfies NamedFileProperty
