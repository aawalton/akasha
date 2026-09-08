import type { Command } from "@akasha/command-system/command"

export const temperInventoryAutomationSet = {
  id: "01a0603c-c1ce-7042-a37c-880bfd4380f9",
  pageTypeSlug: "command",
  slug: "temper-inventory-automation-set",
  definition: "the command setting or clearing one automation toggle",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--scope <scope>",
      takes: "the scope set: everything, one character, or one companion",
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
  helpNotes: [
    "a scope is `global`, `character:<id>` or `companion:<id>`.",
    "`--target` is needed only where the scope is global and the toggle is carried by both interfaces.",
    "saying `null` takes the entry away rather than setting it false.",
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
} as const satisfies Command
