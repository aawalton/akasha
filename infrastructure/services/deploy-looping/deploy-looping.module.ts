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
        "A tick reads whether a service's scope name is free before spending a deploy on it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A scope name taken with no deploy holding it is said, and that service is left for later.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here clears a scope a deploy left behind.",
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
      invariantKind: "departure",
      statement: "A deploy a check refused is said rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement:
        "What the refused deploy said is carried whole, so which checks refused is in what a tick says.",
    },
    {
      invariantKind: "departure",
      statement: "A deploy that ended any other way than a check's refusal fails the tick.",
    },
    {
      invariantKind: "departure",
      statement:
        "The ending a deploy stopped at its ceiling could not keep for itself is kept by the tick.",
    },
    {
      invariantKind: "departure",
      statement:
        "That ending is kept as a refusal, so the service waits out a refusal before it is chosen again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is kept here for a deploy a check refused, which kept its own ending.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick that fails means this loop is broken rather than the tree it reads being red.",
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
    {
      invariantKind: "departure",
      statement:
        "A deploy a tick starts runs under no ceiling, since nobody is waiting on that call.",
    },
  ],
} as const satisfies Module
