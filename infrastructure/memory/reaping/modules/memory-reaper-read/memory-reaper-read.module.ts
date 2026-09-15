import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const memoryReaperRead = {
  id: "01a0686c-f06b-7005-adc8-555b9569ab6f",
  type: "module",
  slug: "memory-reaper-read",
  definition: "what the kernel says every process of one user is holding right now",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process this module cannot read is passed over rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A process whose proportional memory cannot be read is weighed by its resident memory instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ceiling the environment states as no positive finite number is the default.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The host's free memory is read from the memory guard rather than read again.",
    },
  ],
} as const satisfies Module
