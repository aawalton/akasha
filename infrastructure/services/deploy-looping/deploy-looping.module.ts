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
      statement: "The hold a deploy takes is what holds a service to one deploy at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A service already holding a deploy is passed over rather than started again.",
    },
    {
      invariantKind: "departure",
      statement: "The scope outlives the loop, so a loop restarted mid-deploy leaves it running.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick ends once the deploy it started ends, and the next tick is skipped meanwhile.",
    },
    {
      invariantKind: "departure",
      statement: "The deploy runs the code of the tree the workstation kind pinned.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick that puts nothing up says how many were weighed and how many were running.",
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
      statement: "Which services have a deploy running is read off the holds a deploy takes.",
    },
    {
      invariantKind: "departure",
      statement: "A deploy a tick did not start holds that thing, so the tick passes over it.",
    },
    {
      invariantKind: "departure",
      statement: "The deploy runs free of the mark saying a process sits under a run relay.",
    },
  ],
} as const satisfies Module
