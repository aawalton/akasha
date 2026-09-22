import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonCommand = {
  id: "01a061c5-18dd-7006-8723-723b7648294e",
  type: "page-type/module",
  slug: "hud-addon-command",
  definition: "the slash command opening every Temper add-on's own subcommands",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The slash command with no subcommand lists the subcommands registered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The listing groups the subcommands under the add-on that registered the subcommand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subcommand with no handler is listed and not dispatched to.",
    },
  ],
} as const satisfies Module
