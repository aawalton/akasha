import type { Module } from "@akasha/code-system/module"

export const memoryReaperRead = {
  id: "01a0686c-f06b-7005-adc8-555b9569ab6f",
  pageTypeSlug: "module",
  slug: "memory-reaper-read",
  definition: "what the kernel says every process of one user is holding right now",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A process this cannot read is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process whose proportional memory cannot be read is weighed by its resident memory instead.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling the environment states as no positive finite number is the default.",
    },
    {
      invariantKind: "absence",
      statement: "What the host holds free is read from the memory guard rather than read again.",
    },
  ],
} as const satisfies Module
