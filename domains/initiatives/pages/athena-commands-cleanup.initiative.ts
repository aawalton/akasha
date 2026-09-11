import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandsCleanup = {
  id: "01a090f2-adc6-7386-822a-75bf754f4425",
  type: "initiative",
  slug: "athena-commands-cleanup",
  domain: "page-type/command",
  persona: "athena",
  intents: [
    {
      statement: "The five audit findings on the commands domain are reviewed and gone.",
      workingMemory:
        "Three are gone, the page-against-code audit, the caller-facing audit and the module audit. Two are left: `the-folder-shape-audit-of-commands-is-unreviewed` and `the-refusal-audit-of-the-command-system-is-unreviewed`. Reviewing an item means settling it with Alan, landing it as an intent on the child initiative it belongs to, and taking it out of the finding. A finding whose items are all gone is deleted.\n",
    },
  ],
  constraints: [
    "Every landing in this repository runs through the command system, so a fault landed here stops every agent at once.",
    "A command's name is spelled outside akasha, in Alan's aliases and in the editor extension, which no landing here reaches.",
    "Only the coordinating seat runs `akasha audit`, so a subagent cannot judge against a check what that subagent read.",
    "The review of the five audit findings is this initiative's first intent until that intent is met and removed.",
  ],
} as const satisfies Initiative
