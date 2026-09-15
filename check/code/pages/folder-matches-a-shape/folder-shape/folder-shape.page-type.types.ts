import type { FolderShapeEnabled } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/properties/folder-shape-enabled.boolean-property.types.ts"
import type { Module } from "akasha/code/module/module.page-type.types.ts"
import type { Test } from "akasha/code/module/properties/test.code-file-property.types.ts"

export type FolderShape = Module & {
  test: Test
  enabled: FolderShapeEnabled
}
