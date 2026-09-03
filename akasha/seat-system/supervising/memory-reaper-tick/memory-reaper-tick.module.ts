import type { Module } from "@akasha/code-system/module"

export const memoryReaperTick = {
  id: "01a0686c-f06b-7008-9b99-4a53950c8d35",
  pageTypeSlug: "module",
  slug: "memory-reaper-tick",
  definition: "one pass of reading the host, planning the kills and signalling them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A process in a container is left out of everything the tick weighs.",
    },
    {
      invariantKind: "departure",
      statement: "A tick that cannot read what the host holds free disarms its headroom leg.",
    },
    {
      invariantKind: "departure",
      statement: "A tick that cannot read the process table does nothing rather than guessing.",
    },
    {
      invariantKind: "departure",
      statement: "Trees are signalled before single processes.",
    },
    {
      invariantKind: "departure",
      statement: "A tree is signalled from its leaves up to its root.",
    },
    {
      invariantKind: "departure",
      statement: "A tick that overruns its deadline is abandoned rather than left to run on.",
    },
    {
      invariantKind: "departure",
      statement: "A kill that throws is said aloud and the rest of the plan still runs.",
    },
  ],
} as const satisfies Module
