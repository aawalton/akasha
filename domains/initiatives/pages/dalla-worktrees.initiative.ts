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
        "A `bun --preload` plugin resolving every `akasha/` specifier through `/read` with `at` runs repository code with nothing of it on disk; bun cannot import a URL directly. `/read` takes `at` and refuses a commit the repository lacks. A property held outside the commit is read off the checkout whatever commit is named, by `/read` and by `/file`. Still on disk for a service: the index families git ignores (value, shapes, path, listing, import), `node_modules` with a native binary, and the loader.",
    },
    {
      statement: "No deployed service runs out of a worktree.",
      workingMemory:
        "Six trees under `.git/trees/<kind>`, 3.9 GB each, advanced by `git reset --hard` from `akasha deploy`; all 52 workstation units exec a module inside `.git/trees/service-workstation` while `WorkingDirectory` and `AKASHA_ROOT` name the checkout. The deploy loop runs from that tree too, so a move that respells the checkout strands every unit until the tree advances.",
    },
  ],
} as const satisfies Initiative
