import type { TemperAddon } from "akasha/temper/addon/temper-addon.page-type.types.ts"

export const temperAddonKeybinder = {
  id: "01a06381-67c1-79b7-93fa-01801fc096e7",
  type: "page-type/temper-addon",
  slug: "temper-addon-keybinder",
  definition: "the add-on keeping one set of key bindings across every character on the account",

  addonManifest: "json",
  bindings: "xml",
  bundleEntry: "module/keybinder-entry",
  parts: [
    "module/keybinder-binding-fns",
    "module/keybinder-binding-utils",
    "module/keybinder-casts",
    "module/keybinder-constants",
    "module/keybinder-entry",
    "module/keybinder-filter",
    "module/keybinder-init",
    "module/keybinder-keybind-events",
    "module/keybinder-keybind-manager",
    "module/keybinder-public-api",
    "module/keybinder-saved-variables",
    "module/keybinder-scroll-list",
    "module/keybinder-search-box",
    "module/keybinder-share",
    "module/keybinder-state",
    "module/keybinder-ui-strings",
    "type-declaration/keybinder-declarations",
    "module/addon-keybinds-bootstrap",
    "module/addon-keybinds-casts",
    "module/addon-keybinds-entry",
    "module/addon-keybinds-list-hooks",
    "module/addon-keybinds-load",
    "module/addon-keybinds-menu-entry",
    "module/addon-keybinds-names",
    "module/addon-keybinds-strings",
    "module/addon-keybinds-types",
    "type-declaration/addon-keybinds-declarations",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A binding the player shares is kept for the user profile rather than the character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which actions are shared is chosen per action rather than for the whole set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A shared binding is written onto a character the first time that character logs in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key-bind window gains a search field the game does not supply.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game protects rebinding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A keybind whose string id is below the game's last string id is a standard keybind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other keybind is an addon keybind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The standard menu entry and the addon menu entry keep separate scroll positions.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A header is shown only where a row beneath that header is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keybindings menu is split by this add-on rather than by a library.",
    },
  ],
} as const satisfies TemperAddon
