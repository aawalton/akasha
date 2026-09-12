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
        "The four refusals that stated a falsehood are mended: `applying` names the commit and drops the folded edits (`960b8da613c3`), `audit` and `audit-answering` name each round that ran (`a970ead831c6`), and `page-secret-acting` names its commit (`6284dba36f22`). A sweep judged 107 of 236 command files and closed five; 38 in those 107 still write before they throw and name nothing. The other 129 are under sweep now.",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
