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
        "The 43 was an undercount. Five more are silent at HEAD — `temper addon copy-metadata`, `addon data-generate`, `upstream data-port`, `browser test-storage-state`, `inference wan frame` — and two families are judged by shape rather than traced: eleven `runMechanicalChange` callers handing in no `done`, and the seven inference persist commands, answered instead by two invariants on `domain/inference-run`. Roughly 23 open. Seven trees rest on one sweep, not an import-chain trace.\n",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
