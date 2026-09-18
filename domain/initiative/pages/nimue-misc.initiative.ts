import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueMisc = {
  id: "01a0b6bf-9d20-7bb4-a1d0-ee8c4e02c793",
  type: "page-type/initiative",
  slug: "nimue-misc",
  domain: "domain/technology",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "A dev server is named by the commit it runs rather than by a seq or a worktree.",
      workingMemory:
        "seq is an argument, not a property: command/argument/pages/seq.argument.ts. Four things come out of it, all in infrastructure/service/web-app/modules: the worktree ~/worktrees/change-<seq> in change-branch-worktree, and in dev-server-stating the state file ~/projects/<seq>/dev-servers/<app>.json, its log, and the port basePort + seq % 100. Six command pages take --seq: bootstrap, log, restart, start, status, stop. The strict state shape names seq and worktree_path. Nothing here runs git.\n",
    },
  ],
} as const satisfies Initiative
