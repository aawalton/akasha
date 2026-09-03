import type { Module } from "@akasha/code-system/module"

export const memoryReaperConfig = {
  id: "01a0686c-f06b-7007-b2bd-1fadc2d0ea23",
  pageTypeSlug: "module",
  slug: "memory-reaper-config",
  definition: "the ceilings, the headroom margin and the tick the reaper runs under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every ceiling is stated in gibibytes and held in kibibytes.",
    },
    {
      invariantKind: "departure",
      statement: "Every ceiling the environment states as no positive finite number is a default.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling is read once at load rather than read again each tick.",
    },
    {
      invariantKind: "departure",
      statement: "The reaper says every ceiling it is running under before its first tick.",
    },
  ],
} as const satisfies Module
