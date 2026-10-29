import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const temperPortNearTreasure = {
  id: "01a18481-2b96-78e2-adee-79087a29fb34",
  type: "page-type/temper-keybinding",
  slug: "temper-port-near-treasure",
  title: "Port Near Treasure Or Survey",
  key: "TEMPER_PORT_NEAR_TREASURE",
  layer: "general",
  category: "temper-quests",
  bindings: [{ slot: 1, key: "KEY_PAGEDOWN" }],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
