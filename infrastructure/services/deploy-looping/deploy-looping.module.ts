import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deployLooping = {
  id: "01a09586-62c0-7ed5-a9a3-5dbfbfbbabbe",
  type: "module",
  slug: "deploy-looping",
  definition: "one tick of the loop putting up the service of one kind that is furthest behind",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tick puts up at most one service.",
    },
    {
      invariantKind: "departure",
      statement: "The commit a tick works from is the one HEAD is at as that tick opens.",
    },
    {
      invariantKind: "departure",
      statement: "A deploy runs in a transient scope named for the service being put up.",
    },
    {
      invariantKind: "departure",
      statement: "That scope is what holds a service to one deploy at a time.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service whose scope is already running is passed over rather than started again.",
    },
    {
      invariantKind: "departure",
      statement: "The scope outlives the loop, so a loop restarted mid-deploy leaves it running.",
    },
    {
      invariantKind: "departure",
      statement: "A tick starts the deploy and ends rather than waiting for that deploy.",
    },
    {
      invariantKind: "departure",
      statement: "The deploy runs the code of the tree the workstation kind pinned.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick that puts nothing up says how many wanted a deploy and how many were running.",
    },
    {
      invariantKind: "departure",
      statement:
        "A systemd that would not answer which scopes run leaves the tick putting nothing up.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what a deploy is built from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a unit or restarts a service.",
    },
    {
      invariantKind: "departure",
      statement: "The kind a loop ticks over is the word handed to its run.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no kind a deploy puts up is refused by naming every kind.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which scopes are running is asked of systemd, and a scope is started by the program that makes one.",
    },
  ],
} as const satisfies Module
