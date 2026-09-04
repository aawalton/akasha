import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type TypescriptConfig = "json"

export const typescriptConfig = {
  id: "01a06cd1-f990-7065-9e10-bb918f87956c",
  pageTypeSlug: "named-file-property",
  slug: "typescript-config",
  propertySlug: "typescript-config",
  definition: "the TypeScript settings this tree is judged under",
  fileName: "tsconfig.json",
} as const satisfies NamedFileProperty
