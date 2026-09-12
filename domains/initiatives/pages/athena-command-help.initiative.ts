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
        "`helpNotes` is the one hand-written part of a help answer, and every stale line the audits found sits in it. `commands/pages/claude-account/usage/claude-account-usage.command.ts:24` carries a bug post-mortem about `Promise.allSettled`; `commands/pages/seat/compose-notices/seat-compose-notices.command.ts:17` carries an internal to-do; `commands/pages/audit/audit.command.ts:20` writes a shape fact as prose. Nothing re-reads any of it.\n",
    },
  ],
} as const satisfies Initiative
