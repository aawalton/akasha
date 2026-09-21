import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperAddonLibrary = {
  id: "01a0c454-bad1-7182-842e-d1d0a40d6eb7",
  type: "page-type/domain",
  slug: "temper-addon-library",
  definition: "the libraries temper's add-ons share in the game",
  parts: [
    "eso-addon/temper-lib-addon-keybinds",
    "eso-addon/temper-lib-addon-menu",
    "eso-addon/temper-lib-addon-menu-order-list-box",
    "eso-addon/temper-lib-alchemy-station",
    "eso-addon/temper-lib-async",
    "eso-addon/temper-lib-character-knowledge",
    "eso-addon/temper-lib-chat-message",
    "eso-addon/temper-lib-custom-menu",
    "eso-addon/temper-lib-data-encode",
    "eso-addon/temper-lib-debug-logger",
    "eso-addon/temper-lib-extended-journal",
  ],
} as const satisfies Domain
