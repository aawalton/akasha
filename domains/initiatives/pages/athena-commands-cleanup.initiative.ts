import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandsCleanup = {
  id: "01a090f2-adc6-7386-822a-75bf754f4425",
  type: "initiative",
  slug: "athena-commands-cleanup",
  domain: "page-type/command",
  persona: "athena",
  intents: [],
  constraints: [
    "Every landing in this repository runs through the command system, so a fault landed here stops every agent at once.",
    "A command's name is spelled outside akasha, in Alan's aliases and in the editor extension, which no landing here reaches.",
    "Only the coordinating seat runs `akasha audit`, so a subagent cannot judge against a check what that subagent read.",
  ],
} as const satisfies Initiative
