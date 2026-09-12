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
        "`answeredWith` and `refused` live in `command-answering` with `told` and `refusedBy`, and the import edge that bred 198 hand-spelled records is gone. 100 are still longhand over 44 files — 53 report-only, 11 refusal-only, 36 mixed. The rival vocabularies are taken: `inventory-rule-calling`'s `told` and `toldOf`, `workload-applying`'s `Applied`, `service-putting-up`'s `PutUp`. Two aliases are left: `refusedAll` over 13 files and `refusing` over 6.\n",
    },
    {
      statement:
        "A command that wrote before it threw says in its refusal what that command wrote.",
      workingMemory:
        "The eleven `runMechanicalChange` callers are closed and `landedMechanically` lives once. The seven inference persist commands get no thread: `landRow` throws on every path, so nothing past `inference-run-store.module.code.ts:57` has ever run. `alan/harness/**` is swept; what is left sits outside `commands` — mail sent, a push delivered, an account minted, a password rotated — none reached by a command page, only by `infrastructure service run`, whose service bodies carry no `done`.\n",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
