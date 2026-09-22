import type { TemperAddon } from "akasha/temper/addon/temper-addon.page-type.types.ts"

export const temperAddonCompanions = {
  id: "01a0611d-84e6-7be5-8c8a-4c6082779c87",
  type: "page-type/temper-addon",
  slug: "temper-addon-companions",
  definition: "the add-on a player reads a companion's gear and skills from and aims at a build",

  addonManifest: "json",
  bundleEntry: "module/companions-entry",
  bindings: "xml",
  gitIgnore: "gitignore",
  luaModules: ["lua-module/companions-config"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion's gear and skills are written out as one hash a player can carry.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The index a hash has is the index the codec constants and mappings give.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A mapping index moved to another place breaks every companion hash saved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The companion panels are registered as a tab of the characters add-on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only gear a companion already has is offered as an upgrade.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dismissing and resummoning a companion around an interaction is folded in here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads another player's companion.",
    },
  ],
} as const satisfies TemperAddon
