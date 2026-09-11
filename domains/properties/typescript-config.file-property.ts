import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const typescriptConfig = {
  id: "01a06cd1-f990-7065-9e10-bb918f87956c",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "typescript-config",
  propertySlug: "typescript-config",
  definition: "the TypeScript settings this tree is judged under",
  extensions: ["json"],
  fileName: "tsconfig.json",
  toolResolvesPaths: true,
  types: "ts",
} as const satisfies FileProperty
