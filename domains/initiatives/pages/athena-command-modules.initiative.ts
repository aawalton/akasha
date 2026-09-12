import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandModules = {
  id: "01a09264-7109-79f3-9a3d-dd638b13652a",
  type: "initiative",
  slug: "athena-command-modules",
  domain: "page-type/command",
  persona: "athena",
  parent: "athena-commands-cleanup",
  intents: [
    {
      statement: "One function builds a command's refusal.",
      workingMemory:
        "`answeredWith` stays: it alone carries a report and refusals at once, and `model-test` `:64` answers non-zero refusing nothing, which no refusal builder can say. `refusedBy` is `answeredWith` with the report fixed at `[]`, so the refusal builders are the special case. The three hand-built records inside `command-answering` — `faulted`, `unclassified` and `answering`'s catch — went at `7f47d2c7396`, and the rule's own false invariant was mended at `d4eab0a2dc5`. Left: `told`, Alan's.\n",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
