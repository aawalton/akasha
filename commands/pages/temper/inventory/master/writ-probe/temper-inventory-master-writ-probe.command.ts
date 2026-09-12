import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryMasterWritProbe = {
  id: "01a0603c-c1d5-7ba7-b43c-d88542cae62f",
  type: "command",
  slug: "temper-inventory-master-writ-probe",
  definition: "the command giving back the addon's last master-writ journal capture",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--inventory-path <path>", takes: "the saved-variables file the capture is read from" },
    { said: "--json", takes: "give the whole capture as JSON rather than as text" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The capture read is the most recent capture.",
    },
    {
      invariantKind: "departure",
      statement: "Every step and every condition has the raw fields the game gave.",
    },
    {
      invariantKind: "departure",
      statement: "A capture is taken in the game by the `/tempermwprobe` slash command.",
    },
    {
      invariantKind: "departure",
      statement: "A file with no capture refuses the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a capture.",
    },
  ],
  name: "writ-probe",
} as const satisfies Command
