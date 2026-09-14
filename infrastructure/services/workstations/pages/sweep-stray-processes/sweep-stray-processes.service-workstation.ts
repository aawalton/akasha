import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

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
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tick ends only the processes the reading names.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent the reading names as working has nothing of its ended.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent the reading could not read has nothing of its ended.",
    },
    {
      invariantKind: "departure",
      statement: "A process is asked to end before that process is made to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A live descendant stating no acting agent of its own goes with the process it hangs off.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process ended is said with its pid, the subagent it acted under and its command line.",
    },
    {
      invariantKind: "departure",
      statement: "That line says how long the process ran and how much processor the process took.",
    },
    {
      invariantKind: "departure",
      statement: "A tick names every subagent it could not read and says how many.",
    },
    {
      invariantKind: "departure",
      statement:
        "That naming is said only where the set differs from the set the tick before it saw.",
    },
    {
      invariantKind: "departure",
      statement: "A set that gains a subagent, loses one, or empties differs, and is said.",
    },
    {
      invariantKind: "departure",
      statement:
        "The set a tick could not read is kept where the workstation services keep their state.",
    },
    {
      invariantKind: "departure",
      statement: "A tick that ended nothing and read what the tick before it read says nothing.",
    },
    {
      invariantKind: "departure",
      statement: "How often a tick runs is weighed against how long a stray would otherwise run.",
    },
    {
      invariantKind: "departure",
      statement: "How soon a stray could be caught does not set how often a tick runs.",
    },
    {
      invariantKind: "absence",
      statement: "No memory and no processor is read to choose what to end.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A tick is a process that outlives nothing, so nothing it holds reaches the next tick.",
    },
    {
      invariantKind: "constraint",
      statement: "A tick costs about a second of processor whatever that tick finds.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A process a subagent meant to outlive it is ended, since the returned subagent will read nothing.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A subagent's return is read through its seat's page, so a silent index leaves every one unread.",
    },
    {
      invariantKind: "departure",
      statement:
        "An acting agent whose seat no page carries has departed, so its processes are ended.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Each signal alone has been wrong, so a subagent is ended only where both say it has gone.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A page has been seen outliving its subagent, and a transcript naming a working one nowhere.",
    },
    {
      invariantKind: "gap",
      statement:
        "A stray whose subagent's page outlives it runs on, and nothing ends it until its seat goes.",
    },
  ],
} as const satisfies ServiceWorkstation
