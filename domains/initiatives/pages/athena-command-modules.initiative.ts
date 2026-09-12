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
        "`refusedBy` at `command-answering.module.code.ts` builds every refusal reached through a named way, and the four named ways stay — dropping them rewrites an import line in about 100 files and no act does that. `Folded` in `apply-running` now answers a data fault as 2, drawn live. Left: `Answer` lives in `calling`, so `answeredWith` cannot follow it and `index-refresh` still spells its answer by hand; one `move-code-export` over ~270 files closes it.",
    },
    {
      statement:
        "A command that wrote before it threw says in its refusal what that command wrote.",
      workingMemory:
        "A sweep judged 107 of 236 command files; 129 sit in trees other agents hold. Five more closed: `13b1718154d`, `0325a25180b`, `6d097655122`, `b81c4b70f20`, `5bc76cec3cb`. 38 still write before they throw and name nothing, and two refuse with a falsehood: `applying.module.code.ts:205` says `nothing was committed` after the commit landed, and `audit-answering` says `nothing was judged` after the service judged. Both are shared-module mends, in hand.",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
