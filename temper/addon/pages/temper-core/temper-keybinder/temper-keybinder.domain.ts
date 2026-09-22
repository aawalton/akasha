import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperKeybinder = {
  id: "01a0c714-5feb-711a-9cd3-b64a8d77564d",
  type: "page-type/domain",
  slug: "temper-keybinder",
  definition: "one set of key bindings kept across every character on the account",
  parts: [
    "module/addon-keybinds-bootstrap",
    "module/addon-keybinds-casts",
    "module/addon-keybinds-entry",
    "module/addon-keybinds-list-hooks",
    "module/addon-keybinds-load",
    "module/addon-keybinds-menu-entry",
    "module/addon-keybinds-names",
    "module/addon-keybinds-strings",
    "module/addon-keybinds-types",
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
    "type-declaration/addon-keybinds-declarations",
    "type-declaration/keybinder-declarations",
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
      statement: "The keybindings menu is split here rather than by a library.",
    },
  ],
} as const satisfies Domain
