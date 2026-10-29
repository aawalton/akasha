import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const personnalassistant301 = {
  id: "01a18481-2b94-756c-8204-371896201cb9",
  type: "page-type/temper-keybinding",
  slug: "personnalassistant-301",
  title: "Nuzhimeh the Merchant",
  key: "PERSONNALASSISTANT_301",
  layer: "general",
  category: "assistants",
  bindings: [
    { slot: 1, key: "KEY_F5" },
    { slot: 2, key: "KEY_DELETE" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
