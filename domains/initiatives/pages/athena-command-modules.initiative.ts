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
      statement: "One module composes the report a landing answers with.",
      workingMemory:
        "`landing-saying.module.ts:7` says it composes the report, but `applying.module.code.ts:76` builds the commit line and `:96` the path list itself, taking only `defaultMessage` and `formattedSaid` from it. Its `committedLine:49`, `pathsOf:45`, `filledSaid:34`, `reported:74` and `draftedSaid:106` have no reader, and `judged-saying` is reached only through the dead `reportOf:55`. The invariants on that page describe the dead copy.\n",
    },
    {
      statement: "One module reads the arguments an apply takes.",
      workingMemory:
        "`applying.module.ts:12-14` states that the arguments an apply takes are read there rather than by the command naming it, and `askedIn` at `applying.module.code.ts:123` does the reading at `:159`. `apply-running.module.code.ts:169` reads them again on the same arguments one frame above, to reach `asked.measure` alone, and drops the refusals `askedIn` answers. The second parse is what the first module's invariant already forbids.\n",
    },
    {
      statement: "One function builds a command's refusal.",
      workingMemory:
        "`refusedBy` at `command-answering.module.code.ts:24` is the general one, `{ report: [], refusals: said, code }`. The other three are it specialised: `mistaking` at `refusing.module.code.ts:10`, `refused` at `calling.module.code.ts:115`, and a private `refusing` at `:244`. `mistaking` has thirty importers. The `refusing` module's one addition is `troubling:14`, which folds a Trouble into code 1 or 2. `INPUT = 1` is declared twice, at `:6` and `cli.module.code.ts:14`.\n",
    },
    {
      statement: "A module sits at the lowest node of the command tree that reaches it.",
      workingMemory:
        "`namespace.page-type.ts:64` already says a module more than one command of a namespace reaches sits under that namespace, and `pages/read/long-body/` shows the pattern. Six under `commands/modules/` depart: `differing` and `output-reaching` reach `read` alone, `play-row` `music/capture` alone; `change-arguing` two `change` commands, `measure-tabling` two `measure` commands, `inventory-file-arguing` five under `temper/inventory`. A check judges where a module sits, so it cannot drift back.\n",
    },
    {
      statement: "The record of what an agent has read is kept in the agent domain.",
      workingMemory:
        "`agent.page-type.ts:54` says the pages an agent has read are the agent's own, and `:26,33` declare its edits and refusals there. `commands/modules/reading/` holds the record and imports nothing from `commands/`; its readers run across `agents/hooks/`, `seat-system/` and `domains/context/`. `refusals-keeping` is the same case. `agents/read-record/` already holds that name for a module about who is acting, so one of the two is renamed.\n",
    },
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
