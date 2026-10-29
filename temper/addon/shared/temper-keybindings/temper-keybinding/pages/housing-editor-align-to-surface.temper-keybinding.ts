import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const housingEditorAlignToSurface = {
  id: "01a18481-2b92-7811-8bfd-0e399b3b03e3",
  type: "page-type/temper-keybinding",
  slug: "housing-editor-align-to-surface",
  title: "Surface Align",
  key: "HOUSING_EDITOR_ALIGN_TO_SURFACE",
  layer: "housing-editor-placement-mode",
  bindings: [
    { slot: 1, key: "KEY_MOUSE_RIGHT" },
    { slot: 2, key: "KEY_Y" },
    { slot: 3, key: "KEY_GAMEPAD_LEFT_STICK" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
