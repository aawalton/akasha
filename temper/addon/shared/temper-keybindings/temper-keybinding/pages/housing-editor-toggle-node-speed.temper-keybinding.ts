import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorToggleNodeSpeed = {
  id: "01a18481-2b94-7886-9b70-ad83195d0baa",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-toggle-node-speed",
  title: "Toggle Node Speed",
  key: "HOUSING_EDITOR_TOGGLE_NODE_SPEED",
  layer: "housing-editor",
  bindings: [{ slot: 1, key: "KEY_U" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
