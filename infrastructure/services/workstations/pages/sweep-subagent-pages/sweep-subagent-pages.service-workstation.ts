import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const sweepSubagentPages = {
  id: "01a0a017-3fac-72e3-8c1a-7fdf616e1b16",
  type: "service-workstation",
  slug: "sweep-subagent-pages",
  definition: "the service taking away every subagent page the census judges stale",
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    jitterSeconds: 60,
    startTimeoutSeconds: 300,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tick takes away the pages the census judges stale and no others.",
    },
    {
      invariantKind: "absence",
      statement: "No page judged working or undetermined is taken away by a tick.",
    },
    {
      invariantKind: "departure",
      statement: "A tick judges through the same command a person runs by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A tick sweeps the main checkout rather than the tree the service runs from.",
    },
    {
      invariantKind: "departure",
      statement: "A tick that finds nothing stale writes nothing and takes no lock.",
    },
    {
      invariantKind: "departure",
      statement: "A tick says which pages went and says nothing where none went.",
    },
    {
      invariantKind: "departure",
      statement: "A page taken away goes as a commit, so what it was stays in history.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent dispatched again takes its page back out of that history.",
    },
    {
      invariantKind: "departure",
      statement: "A landing another landing holds the lock against writes nothing and says so.",
    },
    {
      invariantKind: "departure",
      statement: "A tick that wrote nothing for a held lock ran rather than failed.",
    },
    {
      invariantKind: "departure",
      statement: "A tick that cannot run at all carries its fault out and fails the unit.",
    },
    {
      invariantKind: "constraint",
      statement: "A tick costs about three seconds and 300 MB whatever that tick finds.",
    },
    {
      invariantKind: "constraint",
      statement: "Most ticks find nothing, since a returning subagent's page goes at its own end.",
    },
    {
      invariantKind: "departure",
      statement: "How often a tick runs bounds how long a stopped subagent's row stays up.",
    },
    {
      invariantKind: "absence",
      statement: "No page's age is read to decide what goes.",
    },
  ],
} as const satisfies ServiceWorkstation
