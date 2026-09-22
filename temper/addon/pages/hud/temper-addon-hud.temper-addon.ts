import type { TemperAddon } from "akasha/temper/addon/temper-addon.page-type.types.ts"

export const temperAddonHud = {
  id: "01a061c5-18dd-7011-a8e7-8f6d488e9b03",
  type: "page-type/temper-addon",
  slug: "temper-addon-hud",
  definition: "the add-on Temper ships into the game",

  addonManifest: "json",
  addonBinFolder: true,
  bindings: "xml",
  bundleEntry: "module/hud-addon-entry",
  parts: [
    "domain/temper-errors",
    "domain/temper-events",
    "domain/temper-housing",
    "domain/temper-interface",
    "domain/temper-keybinder",
    "domain/temper-selector",
    "eso-interface/fcocs-virtuals",
    "eso-interface/next-boss-layout",
    "eso-interface/shifter-box-template",
    "module/hud-addon-bar",
    "module/hud-addon-builtins",
    "module/hud-addon-command-registry",
    "module/hud-addon-command",
    "module/hud-addon-entry",
    "module/hud-addon-field-registry",
    "module/hud-addon-format",
    "module/hud-addon-hide-init",
    "module/hud-addon-hide-plan",
    "module/hud-addon-hide-registry",
    "module/hud-addon-hide-targets",
    "module/hud-addon-hide-types",
    "module/hud-addon-names",
    "module/hud-addon-public-api",
    "module/hud-addon-saved-variables",
    "module/hud-addon-settings-panel",
    "module/hud-addon-types",
    "module/hud-addon-visibility-version",
  ],
  interfaces: [
    "eso-interface/shifter-box-template",
    "eso-interface/next-boss-layout",
    "eso-interface/fcocs-virtuals",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The parts of the HUD the heads-up add-on hides are read from `temper-hud-components`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The parts the player has shown and hidden are kept across the whole account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An add-on adding a field to the bar states the order that field sits at.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows the meaning of any other add-on's field.",
    },
  ],
} as const satisfies TemperAddon
