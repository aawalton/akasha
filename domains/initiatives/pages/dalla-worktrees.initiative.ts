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
        "A plugin resolving `akasha/` through `/read` in its own namespace ran 170 modules of `send-due-reminders` with nothing on disk; `zod` still resolved from `node_modules`, on disk here and installed remotely from the lockfile. The deploy writes that loader beside each unit file. Pinning waits on the index: at `8a509d9e224` the served code spells `INDEX_AT` as `.git/indexes` while the disk holds `.indexes`. `path`, `listing` and `import` are reached only from changes and checks.",
    },
    {
      statement: "No deployed service runs out of a worktree.",
      workingMemory:
        "Six trees under `.git/trees/<kind>` hold 23 GB, advanced by `git reset --hard` from `akasha deploy`; every workstation unit execs a module inside `.git/trees/service-workstation` while `WorkingDirectory` and `AKASHA_ROOT` name the checkout. That tree holds no `node_modules`, so every `akasha/` import below the entry loads from the live checkout: the pin is one file deep. The deploy loop runs from that tree too, so a move respelling the checkout strands every unit.",
    },
  ],
} as const satisfies Initiative
