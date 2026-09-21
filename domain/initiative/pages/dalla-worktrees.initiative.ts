import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const dallaWorktrees = {
  id: "01a09c1f-6e64-7043-941a-a8f6b51cdb0b",
  type: "page-type/initiative",
  slug: "dalla-worktrees",
  domain: "domain/git",
  persona: "persona/dalla",
  intentStack: [
    {
      statement:
        "A deployed service runs from a checkout at the commit it was deployed at, every file deep.",
      workingMemory:
        "Done: the index rebuild is off `pinnedTree` (`7883811d`), and a cluster pod resets to the commit its manifest was composed at (`b11bddb3`). Every tree carries a `package.json` naming the package `akasha`, so `akasha/…` in a tree resolves in that tree. Left: `/read` serves from the checkout with no commit in it, so 16 wire-loaded services run live code; 33 drafts removing that loader are parked under subagent record `dalla-aa59d9ba86c9a7948`, waiting on where `temper-watcher`'s ordering belongs.",
    },
  ],
} as const satisfies Initiative
