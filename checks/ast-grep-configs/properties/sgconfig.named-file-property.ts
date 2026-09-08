import type { NamedFileProperty } from "@akasha/pages/named-file-property"

export type Sgconfig = "yml"

export const sgconfig = {
  id: "01a0818d-8223-7f0c-80f9-8f6fe2948b5e",
  pageTypeSlug: "named-file-property",
  slug: "sgconfig",
  propertySlug: "sgconfig",
  definition: "the rule directories ast-grep gathers its rules from",
  fileName: "sgconfig.yml",
} as const satisfies NamedFileProperty
