import type { FolderShapeEnabled } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/properties/folder-shape-enabled.boolean-property.types.ts"
import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"
import type { Test } from "akasha/code-system/modules/properties/test.code-file-property.types.ts"

export type FolderShape = Module & {
  test: Test
  enabled: FolderShapeEnabled
}
