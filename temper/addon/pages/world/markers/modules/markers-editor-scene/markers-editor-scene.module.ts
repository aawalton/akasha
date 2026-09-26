import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markersEditorScene = {
  id: "01a0de85-2b4b-7397-b855-b1387926156c",
  type: "page-type/module",
  slug: "markers-editor-scene",
  definition: "the editor's scene, opened from the settings or a chat command",
  code: "ts",
} as const satisfies Module
