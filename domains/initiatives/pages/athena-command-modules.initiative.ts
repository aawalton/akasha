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
  ],
  constraints: [
    "A module moved out of the command system is imported by name, so every importer moves with it.",
  ],
} as const satisfies Initiative
