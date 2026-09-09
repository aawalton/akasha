import type { BuildFolderProperty } from "@akasha/pages/build-folder-property"

export type BytecodeDirectory = true

export const bytecodeDirectory = {
  id: "01a081f6-1ea7-7c91-b3f0-88c8dfea6c77",
  pageTypeSlug: "build-folder-property",
  type: "build-folder-property",
  slug: "bytecode-directory",
  propertySlug: "bytecode-directory",
  definition: "the bytecode Python writes for a module",
  folderName: "__pycache__",
} as const satisfies BuildFolderProperty
