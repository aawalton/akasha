import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCustomMenu = {
  id: "01a0c763-6643-7e44-9e90-d6a8624a0293",
  type: "page-type/domain",
  slug: "temper-custom-menu",
  definition: "the rows and submenus an add-on adds to the game's own context menu",
  parts: [
    "module/custom-menu-casts",
    "module/custom-menu-constants",
    "module/custom-menu-hooks",
    "module/custom-menu-lib",
    "module/custom-menu-main",
    "module/custom-menu-public-api",
    "module/custom-menu-types",
    "module/eso-menu",
    "module/menu-row-factories",
    "module/menu-row-setup",
    "module/submenu-item",
    "module/submenu-rows",
    "module/submenu-text-colors",
    "module/submenu-timeout",
    "module/submenu-window",
    "type-declaration/menu-decl",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An add-on adds a row by calling a global the game's own menu code reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's own menu is hooked rather than replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A submenu is a window of its own that closes on a timeout.",
    },
  ],
} as const satisfies Domain
