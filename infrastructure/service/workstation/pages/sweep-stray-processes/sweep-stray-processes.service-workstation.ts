import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const sweepStrayProcesses = {
  id: "01a09cee-2585-7d35-b95e-24ea1f6ace82",
  type: "service-workstation",
  slug: "sweep-stray-processes",
  definition: "the service ending every process left running by a subagent that has returned",
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 5,
    startTimeoutSeconds: 300,
  },
  told: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick ends only the processes the reading names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent the reading names as working has nothing of its ended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent the reading could not read has nothing of its ended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process is asked to end before that process is made to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A live descendant stating no acting agent of its own goes with the process it hangs off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A process ended is said with its pid, the subagent it acted under and its command line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That line says how long the process ran and how much processor the process took.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick names every subagent it could not read and says how many.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "That naming is said only where the set differs from the set the tick before it saw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A set that gains a subagent, loses one, or empties differs, and is said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The set a tick could not read is kept where the workstation services keep their state.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick that ended nothing and read what the tick before it read says nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How often a tick runs is weighed against how long a stray would otherwise run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How soon a stray could be caught does not set how often a tick runs.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No memory and no processor is read to choose what to end.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A tick is a process that outlives nothing, so nothing it holds reaches the next tick.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A tick costs about a second of processor whatever that tick finds.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A process a subagent meant to outlive it is ended, since the returned subagent will read nothing.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A subagent's return is read through its seat's page, so a silent index leaves every one unread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An acting agent whose seat no page carries has departed, so its processes are ended.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stray is ended whether or not a page still carries its subagent.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A subagent's page waits on what that subagent left running rather than on its return.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A page therefore goes only once there is nothing left for a tick to end.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A transcript naming a subagent nowhere leaves it unread, so a silence ends nothing.",
    },
  ],
} as const satisfies ServiceWorkstation
