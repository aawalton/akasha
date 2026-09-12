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
        "`answeredWith` and `refused` now live in `command-answering` beside `told` and `refusedBy`, `f53e46065ac` over 30 files and `78fc257556d` over 81, and `index refresh` builds its answer rather than writing it out. What is left is a sweep: 152 records still written out longhand over 62 files, 83 report-only, 32 refusal-only, 37 mixed. They exist because `calling` drags 93 modules and `command-answering` drags 3, so the builder people needed most sat behind the heavier edge.\n",
    },
    {
      statement:
        "A command that wrote before it threw says in its refusal what that command wrote.",
      workingMemory:
        "Judging by shape undercounts. An import-chain trace over seven trees found 17 more silent at HEAD, about as many as the sweep had found. The eleven `runMechanicalChange` callers are closed, `857f539d1a4` through `6c6670918c1`, and `landedMechanically` now lives once in `mechanical-change-running`. The seven inference persist commands get no `done` thread: `landRow` throws on every path, so nothing past `inference-run-store.module.code.ts:57` has ever run, and two invariants answer instead.\n",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
