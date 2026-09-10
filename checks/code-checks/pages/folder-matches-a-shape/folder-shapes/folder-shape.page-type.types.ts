import type { Module } from "../../../../../code-system/modules/module.page-type.types.ts"
import type { Test } from "../../../../../code-system/modules/properties/test.code-file-property.ts"
import type { FolderShapeEnabled } from "./properties/folder-shape-enabled.boolean-property.types.ts"

export type FolderShape = Module & {
  test: Test
  enabled: FolderShapeEnabled
}
