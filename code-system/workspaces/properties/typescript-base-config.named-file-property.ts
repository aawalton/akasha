import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type TypescriptBaseConfig = "json"

export const typescriptBaseConfig = {
  id: "01a06cd1-f990-71cd-a153-80d09c4d327a",
  pageTypeSlug: "named-file-property",
  slug: "typescript-base-config",
  propertySlug: "typescript-base-config",
  definition: "the TypeScript settings every other config in this tree extends",
  fileName: "tsconfig.base.json",
} as const satisfies NamedFileProperty
