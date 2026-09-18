import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueMisc = {
  id: "01a0b6bf-9d20-7bb4-a1d0-ee8c4e02c793",
  type: "page-type/initiative",
  slug: "nimue-misc",
  domain: "domain/technology",
  persona: "persona/nimue",
  intentStack: [
    {
      statement:
        "No seq argument exists, and no dev server code works a name or a port out of one.",
      workingMemory:
        "seq is an argument, not a property: command/argument/pages/seq.argument.ts, --seq, a whole number naming the worktree, the state file and the log. Six dev server commands name it: bootstrap, log, restart, start, status, stop; their code and tests import it, as does modules/dev-server-running, which works the port out of the base port against the seq, as port.argument says too. The state file carries seq, written by dev-server-recording and shaped by dev-server-stating. Worktrees are named now.",
    },
  ],
} as const satisfies Initiative
