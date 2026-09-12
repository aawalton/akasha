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
      statement: "A command's help parts what that command does from what it does not do yet.",
      workingMemory:
        "`helpOf` at `commands/modules/help-writing/help-writing.module.code.ts` writes every invariant a command's page states, unmarked. 17 across the 225 command pages are `gap` — `gap.invariant-kind.ts` calls a gap an invariant that does not hold yet — so a caller reads `The rendering of the registry is in akasha.` as a fact about the command they are about to run. Filtering means either spelling the kind slugs in the renderer or reading the index there. Which?",
    },
    {
      statement: "A command stating nothing taken answers the help flag rather than refusing it.",
      workingMemory:
        "`taking.record-property.ts:22` says a command stating nothing here is handed the help flag to answer itself. Twelve state neither `taking` nor `arguments`. The six under `commands/pages/change/` do answer. The other six do not: `akasha seat start --help` refuses with `unknown flag: --help` and exits 1, and `measure-attribute`, `measure-persona`, `refresh-attribute`, `refresh-message` and `refresh-persona` are the same. Do those six answer, or state what they take?\n",
    },
  ],
} as const satisfies Initiative
