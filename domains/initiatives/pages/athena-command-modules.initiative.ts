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
        "`refusedBy` at `command-answering.module.code.ts` builds every refusal, and the four named ways stay. Left: `Answer` lives in `calling`, so `answeredWith` cannot follow it and `index-refresh` spells its answer by hand. Rehearsed: three `move-code-export` drafts in one apply over 273 files, 2.7 processor seconds against a 300 ceiling, 0 refusals, and `answeredWith` and `refused` add no extra file. The apply's own cost is unmeasured.\n",
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
