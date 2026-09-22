import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperSelector = {
  id: "01a0c6ff-2fed-7ea2-a106-ee20a4ca2ecf",
  type: "page-type/domain",
  slug: "temper-selector",
  definition: "which add-ons are on, saved as a pack the player switches between",
  parts: [
    "module/selector-addon-manager",
    "module/selector-constants",
    "module/selector-entry",
    "module/selector-events",
    "module/selector-keybinds",
    "module/selector-packs",
    "module/selector-packs-core",
    "module/selector-public-api",
    "module/selector-saved-variables",
    "module/selector-search",
    "module/selector-slash-command",
    "module/selector-strings",
    "module/selector-types",
    "module/selector-ui-dropdown",
    "module/selector-ui-layout",
    "module/selector-ui-settings-menu",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pack has the add-ons that were on when the pack was saved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An add-on outside the pack being loaded is switched off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This add-on is never switched off by a pack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game acts on a switched add-on only once the interface reloads.",
    },
  ],
} as const satisfies Domain
