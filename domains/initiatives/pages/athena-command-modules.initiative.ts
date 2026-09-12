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
        "`answeredWith` stays: it alone carries a report and refusals at once, and `model-test` `:64` answers non-zero refusing nothing, which no refusal builder can say. `refusedBy` is `answeredWith` with the report fixed at `[]`, so the refusal builders are the special case. Five invariants landed at `5eb64d01ba4`. Left: three hand-built records inside `command-answering` — `faulted`, `unclassified` and `answering`'s catch — each identical to a builder in the same file. `told` is Alan's.\n",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
