import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const devServerRunning = {
  id: "01a09401-2596-7b81-9dc3-f483f18f9657",
  type: "module",
  slug: "dev-server-running",
  definition: "one app's dev server spawned in a worktree, and ended again",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A start refuses a server already running rather than replacing that server.",
    },
    {
      invariantKind: "departure",
      statement:
        "A start writes the app's `.env.local` from the app's secret pages where that file is not there yet.",
    },
    {
      invariantKind: "departure",
      statement: "A stop sends SIGTERM first.",
    },
    {
      invariantKind: "departure",
      statement: "A stop then waits for the process to go.",
    },
    {
      invariantKind: "departure",
      statement: "A stop sends SIGKILL to a process the wait did not outlast.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stop already stopped is answered as stopped and the state file the server left is taken.",
    },
    {
      invariantKind: "departure",
      statement: "The port is the app's base port against the seq where no port is named.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a log.",
    },
    {
      invariantKind: "departure",
      statement: "A start names the server it left running and the state file it wrote.",
    },
  ],
} as const satisfies Module
