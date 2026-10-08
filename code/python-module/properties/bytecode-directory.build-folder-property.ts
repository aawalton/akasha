import type { BuildFolderProperty } from "akasha/page/build-folder-property/build-folder-property.page-type.types.ts"

export const bytecodeDirectory = {
  id: "01a081f6-1ea7-7c91-b3f0-88c8dfea6c77",
  type: "page-type/build-folder-property",
  slug: "bytecode-directory",
  propertySlug: "bytecode-directory",
  definition: "the bytecode Python writes for a module",
  folderName: "__pycache__",
  generated: true,
  types: "ts",
  createdAt: "2026-09-08T16:59:45.703Z",
  updatedAt: "2026-09-15T16:02:23.000Z",
} as const satisfies BuildFolderProperty
