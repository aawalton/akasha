import type { FileProperty } from "@akasha/pages/file-property"

export type TypescriptConfig = "json"

export const typescriptConfig = {
  id: "01a06cd1-f990-7065-9e10-bb918f87956c",
  pageTypeSlug: "file-property",
  slug: "typescript-config",
  propertySlug: "typescript-config",
  definition: "the TypeScript settings this tree is judged under",
  fileName: "tsconfig.json",
} as const satisfies FileProperty
