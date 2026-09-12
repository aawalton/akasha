import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryAutomationSet = {
  id: "01a0603c-c1ce-7042-a37c-880bfd4380f9",
  type: "command",
  slug: "temper-inventory-automation-set",
  definition: "the command setting or clearing one automation toggle",
  code: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--scope <scope>",
      takes: "the scope set, as `global`, `character:<id>` or `companion:<id>`",
    },
    { said: "--toggle <name>", takes: "the toggle set" },
    {
      said: "--value <true|false|null>",
      takes: "what the toggle becomes, where `null` takes the entry away",
    },
    {
      said: "--target <characters|companions>",
      takes: "which interface a toggle carried by both is set on",
    },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "One call sets one toggle.",
    },
    {
      invariantKind: "departure",
      statement: "A null value takes the entry away.",
    },
    {
      invariantKind: "departure",
      statement: "A global toggle carried by both interfaces needs a target.",
    },
    {
      invariantKind: "departure",
      statement: "A toggle no interface carries refuses the call.",
    },
  ],
  name: "set",
} as const satisfies Command
