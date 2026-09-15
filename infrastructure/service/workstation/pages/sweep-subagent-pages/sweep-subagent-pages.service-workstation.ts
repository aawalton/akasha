import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const sweepSubagentPages = {
  id: "01a0a017-3fac-72e3-8c1a-7fdf616e1b16",
  type: "service-workstation",
  slug: "sweep-subagent-pages",
  definition: "the service taking away every subagent page the census judges stale",
  enabled: true,
  systemd: {
    schedule: "*:0/15",
    jitterSeconds: 60,
    startTimeoutSeconds: 420,
  },
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick takes away the pages the census judges stale and no others.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page judged working or undetermined is taken away by a tick.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick judges through the same command a person runs by hand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick sweeps the main checkout rather than the tree the service runs from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick that finds nothing stale writes nothing and takes no lock.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick says which pages went and says nothing where none went.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page taken away goes as a commit, so what it was stays in history.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent dispatched again takes its page back out of that history.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing another landing holds the lock against writes nothing and says so.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick that wrote nothing for a held lock ran rather than failed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick that cannot run at all carries its fault out and fails the unit.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A tick costs 5 to 19 seconds of processor and peaks between 1 and 2 GB.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A tick waits up to 300 seconds for the landing lock every seat shares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick is allowed longer than that wait, so a held lock ends a tick gently.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "systemd runs one tick of a unit at a time, whatever the timer does meanwhile.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A timer elapsing during a tick joins that tick rather than starting a second one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An interval under a tick's own ceiling is therefore safe and costs a skipped tick.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "Reading which pages carry a stop costs a quarter second and 135 MB over 24 pages.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "That reading is the whole of a tick's work where no page carries a stop.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "That cheap reading shares this clock with the full census rather than running oftener.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A tick reads the tree and then waits, so waiting longer means more moved under it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tick whose paths moved while it waited writes nothing and names what moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That tick ran rather than failed, and the tick after it reads the tree again.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A tick keeps no edits, so a tick leaves nothing behind for the next tick.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page gone between the census and the take leaves the take saying so.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How often a tick runs bounds how long a stopped subagent's row stays up.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page's age is read to decide what goes.",
    },
  ],
} as const satisfies ServiceWorkstation
