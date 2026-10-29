import type { TemperKeybinding } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/temper-keybinding.page-type.types.ts"

export const commandPet = {
  id: "01a18481-2b90-7148-8570-4655c7f4e5c6",
  type: "page-type/temper-keybinding",
  slug: "command-pet",
  title: "Command Pet",
  key: "COMMAND_PET",
  layer: "general",
  category: "combat",
  bindings: [
    { slot: 1, key: "KEY_ALT" },
    { slot: 2, key: "KEY_GAMEPAD_BOTH_STICKS" },
  ],
  shared: true,
  changedAt: "2026-10-28T21:42:33.155Z",
  createdAt: "2026-10-28T21:53:40.236Z",
  updatedAt: "2026-10-29T12:42:48.616Z",
} as const satisfies TemperKeybinding
