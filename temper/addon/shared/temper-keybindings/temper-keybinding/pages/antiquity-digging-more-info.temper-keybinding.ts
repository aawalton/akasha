import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const antiquityDiggingMoreInfo = {
  id: "01a187af-33a9-751f-bbd9-d3653fdbb9de",
  type: "page-type/temper-keybinding",
  slug: "antiquity-digging-more-info",
  key: "ANTIQUITY_DIGGING_MORE_INFO",
  layer: "antiquitydiggingactions",
  bindings: [
    { slot: 1, key: "KEY_TAB" },
    { slot: 2, key: "KEY_GAMEPAD_BUTTON_4" },
  ],
  shared: false,
  changedAt: "2026-10-29T12:27:32.000Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
  createdAt: "2026-10-29T12:42:49.704Z",
} as const satisfies TemperKeybinding
