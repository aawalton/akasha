import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const typescriptBaseConfig = {
  id: "01a06cd1-f990-71cd-a153-80d09c4d327a",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "typescript-base-config",
  propertySlug: "typescript-base-config",
  definition: "the TypeScript settings every other config in this tree extends",
  extensions: ["json"],
  fileName: "tsconfig.base.json",
  toolResolvesPaths: true,
  types: "ts",
} as const satisfies FileProperty
