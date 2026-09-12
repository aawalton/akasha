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
      statement: "No command page states help notes.",
      workingMemory:
        "215 command pages are swept clean; no command page states help notes. Left: the reader in `commands/modules/help-writing/`, the declaration at `commands/command.page-type.ts:15,128`, the page `commands/properties/help-notes.text-property.ts`, and two invariants at `commands/properties/taking.record-property.ts:25,29`. Deploy's 53 notes were bound by the fourteen modules its page names. Does a command stating no `taking` still answer its own help?\n",
    },
    {
      statement: "A command's help parts what that command does from what it does not do yet.",
      workingMemory:
        "`helpOf` at `commands/modules/help-writing/help-writing.module.code.ts` writes every invariant a command's page states, unmarked. 17 across the 225 command pages are `gap` — `gap.invariant-kind.ts` calls a gap an invariant that does not hold yet — so a caller reads `The rendering of the registry is in akasha.` as a fact about the command they are about to run. Filtering means either spelling the kind slugs in the renderer or reading the index there. Which?",
    },
  ],
} as const satisfies Initiative
