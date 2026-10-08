import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const typescriptConfig = {
  id: "01a06cd1-f990-7065-9e10-bb918f87956c",
  type: "page-type/file-property",
  slug: "typescript-config",
  propertySlug: "typescript-config",
  definition: "this tree's TypeScript settings",
  extensions: ["json"],
  fileName: "tsconfig.json",
  toolResolvesPaths: true,
  types: "ts",
  createdAt: "2026-09-04T14:28:15.376Z",
  updatedAt: "2026-09-22T13:44:00.000Z",
} as const satisfies FileProperty
