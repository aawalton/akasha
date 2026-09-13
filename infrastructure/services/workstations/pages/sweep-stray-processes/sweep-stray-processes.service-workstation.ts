import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const sweepStrayProcesses = {
  id: "01a09cee-2585-7d35-b95e-24ea1f6ace82",
  type: "service-workstation",
  slug: "sweep-stray-processes",
  definition: "the service ending every process left running by a subagent that has returned",
  enabled: true,
  systemd: {
    schedule: "*:*:00",
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
      statement: "A tick that ended nothing and read every subagent says nothing.",
    },
    {
      invariantKind: "absence",
      statement: "No memory and no processor is read to choose what to end.",
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
      invariantKind: "constraint",
      statement:
        "An acting agent naming no seat page is never read, so its processes are never ended.",
    },
  ],
} as const satisfies ServiceWorkstation
