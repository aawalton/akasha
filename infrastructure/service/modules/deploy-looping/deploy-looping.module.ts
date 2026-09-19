import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployLooping = {
  id: "01a09586-62c0-7ed5-a9a3-5dbfbfbbabbe",
  type: "page-type/module",
  slug: "deploy-looping",
  definition: "one tick of the loop putting up the service of one kind that is furthest behind",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick puts up at most one service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit a tick works from is the one HEAD is at as that tick opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy runs in a transient scope named for the service being put up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hold a deploy takes is what holds a service to one deploy at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service already holding a deploy is passed over rather than started again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scope outlives the loop, so a loop restarted mid-deploy leaves it running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick reads whether a service's scope name is free before spending a deploy on it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scope name taken with no deploy holding it is said, and that service is left for later.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here clears a scope a deploy left behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick ends once the deploy it started ends, and the next tick is skipped meanwhile.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The deploy runs the code of the tree the workstation kind pinned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick that puts nothing up says how many were weighed and how many are up to date.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick that puts nothing up says how many are waiting out a cooldown and how many are running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick with nothing up to date and a tick with everything up to date do not read alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those counts are read off the answers the tick already asked for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges what a deploy is built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy a check refused is said rather than thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What the refused deploy said is carried whole, so which checks refused is in what a tick says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy that ended any other way than a check's refusal fails the tick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ending a deploy stopped at its ceiling could not keep for itself is kept by the tick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That ending is kept as a refusal, so the service waits out a refusal before it is chosen again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the deploy said as it ended is kept with that refusal.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing is kept here for a deploy a check refused, which kept its own ending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick that fails means this loop is broken rather than the tree it reads being red.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a unit or restarts a service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kind a loop ticks over is the word handed to its run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind a deploy puts up has a workstation service ticking it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed no kind a deploy puts up is refused by naming every kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which services have a deploy running is read off the holds a deploy takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy a tick did not start holds that thing, so the tick passes over it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy a tick starts runs under no ceiling, since nobody is waiting on that call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy that will not end is ended by systemd, which kills the scope's whole cgroup.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That bound is an hour, which is long enough that only a deploy that is hung meets it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A loop's own unit is given longer to start than the hour that bounds its deploy's scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The unit's bound catches only a loop hung outside that scope.",
    },
  ],
} as const satisfies Module
