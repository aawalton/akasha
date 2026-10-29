import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const uspfToggle = {
  id: "01a18481-2b9a-70a2-bf94-7980bf4b819f",
  type: "page-type/temper-keybinding",
  slug: "uspf-toggle",
  title: "Show Skill Point Finder",
  key: "USPF_TOGGLE",
  layer: "general",
  category: "temper-completion-skill-points",
  bindings: [{ slot: 1, key: "KEY_NUMPAD6" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
