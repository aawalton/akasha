import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const dallaWorktrees = {
  id: "01a09c1f-6e64-7043-941a-a8f6b51cdb0b",
  type: "initiative",
  slug: "dalla-worktrees",
  domain: "domain/git",
  persona: "dalla",
  intents: [
    {
      statement:
        "A deployed service gets every file it needs from the pages service at its deployed commit.",
      workingMemory:
        "`/read` takes `at`, and a property outside the commit reads off the checkout whatever commit is named. `deploy-file-closure` already walks tracked files only, so it is the per-service manifest at a commit. The npm tree stays off the pages service: resolved from `node_modules` here, installed remotely from the tracked `package.json` and `bun.lock`. `path`, `listing` and `import` are reached only from changes and checks, so `value` and `shapes` are the only families blocking a service.",
    },
    {
      statement: "No deployed service runs out of a worktree.",
      workingMemory:
        "Six trees under `.git/trees/<kind>`, 3.9 GB each, advanced by `git reset --hard` from `akasha deploy`; all 52 workstation units exec a module inside `.git/trees/service-workstation` while `WorkingDirectory` and `AKASHA_ROOT` name the checkout. The deploy loop runs from that tree too, so a move that respells the checkout strands every unit until the tree advances.",
    },
  ],
} as const satisfies Initiative
