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
      statement: "One function builds the answer a command hands back.",
      workingMemory:
        "`told` and `refusedBy` delegate to `answeredWith` at `7dcba422b4f`, so one function builds the record. `told` builds no refusal, so the statement now names the answer rather than the refusal. `model-gateway-swap` holds none: that census line was stale, it goes through the builders. Left: three answers derived by spread outside the module, `alan-food` `:357`, `track-health-import` `:132`, `apply-running` `:180`. Alan's: whether work doing nothing before throwing takes the `done` list.",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
