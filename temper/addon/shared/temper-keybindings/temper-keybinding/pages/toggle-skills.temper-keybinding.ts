import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const toggleSkills = {
  id: "01a18481-2b98-75de-8f67-a845f2bc086d",
  type: "page-type/temper-keybinding",
  slug: "toggle-skills",
  title: "Skills",
  key: "TOGGLE_SKILLS",
  layer: "general",
  category: "user-interface",
  bindings: [{ slot: 1, key: "KEY_K" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
