import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const athenaCommandHelp = {
  id: "01a09263-e212-7c22-824e-eb48637576f3",
  type: "initiative",
  slug: "athena-command-help",
  domain: "page-type/command",
  persona: "athena",
  parent: "athena-commands-cleanup",
  intents: [
    {
      statement: "A command stating nothing taken answers the help flag rather than refusing it.",
      workingMemory:
        "The five that ignored `argv` and the one that refused now answer, in `5a7dc204b0f` through `718d429a17e`. Six are left, all under `akasha change`, and their code refuses the flag: `wordlessIn` at `change-arguing.module.code.ts:6` and `change-show.command.code.ts:92`. Three state `No taking is stated here.` as an invariant of their own, against `taking.record-property.ts:24`. Do those six state what they take, or does that property carve out a command reading what is piped in?",
    },
  ],
} as const satisfies Initiative
