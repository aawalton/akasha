import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const memoryReaperConfig = {
  id: "01a0686c-f06b-7007-b2bd-1fadc2d0ea23",
  type: "module",
  slug: "memory-reaper-config",
  definition: "the ceilings, the headroom margin and the tick the reaper runs under",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every ceiling is stated in gibibytes and held in kibibytes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every ceiling the environment states as no positive finite number is a default.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ceiling is read once at load rather than read again each tick.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The reaper says every ceiling that reaper is running under before its first tick.",
    },
  ],
} as const satisfies Module
