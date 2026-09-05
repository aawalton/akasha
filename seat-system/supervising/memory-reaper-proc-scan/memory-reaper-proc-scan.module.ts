import type { Module } from "@akasha/code-system/module"

export const memoryReaperProcScan = {
  id: "01a0686c-f06b-7000-bd79-2d9700be871d",
  pageTypeSlug: "module",
  slug: "memory-reaper-proc-scan",
  definition: "what one process holds, and its command line with what it must not say withheld",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A process this module cannot read is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag naming a credential has its value withheld as redacted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value under a flag that is not known safe is withheld as unclassified rather than shown.",
    },
    {
      invariantKind: "departure",
      statement: "A command line longer than the cap is cut and says how many tokens were dropped.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process in a rootless-podman cgroup is a container rather than a fleet process.",
    },
  ],
} as const satisfies Module
